package com.backend.service.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.backend.configuration.security.auth.AuthenticationConfiguration;
import com.backend.core.exception.ApplicationException;
import com.backend.core.message.auth.TokenResponse;
import com.backend.core.message.auth.TokenType;
import com.backend.core.message.error.ErrorCode;
import com.backend.data.model.user.User;
import com.backend.data.model.user.UserRole;
import com.backend.data.model.user.UserToken;
import com.backend.data.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private static final String TOKEN_TYPE_CLAIM = "type";

    private final AuthenticationManager authenticationManager;
    private final AuthenticationConfiguration configuration;
    private final UserRepository userRepository;

    public TokenResponse authenticate(String email, String password, UserRole role) throws ApplicationException {
        final Authentication authentication;

        try {
            final var authToken = new UsernamePasswordAuthenticationToken(email, password, new ArrayList<>());
            authentication = authenticationManager.authenticate(authToken);
        } catch (AuthenticationException e) {
            throw new ApplicationException(ErrorCode.AuthenticationBadCredentials);
        }

        if (!authentication.isAuthenticated() || role != getRole(authentication)) {
            throw new ApplicationException(ErrorCode.AuthenticationBadCredentials);
        }

        log.debug("Authenticate user. Email: '{}', role: '{}'", email, role);

        return create(email);
    }

    public TokenResponse refresh(String refreshToken) throws ApplicationException {
        final Authentication authentication = verify(refreshToken, TokenType.Refresh);

        if (authentication == null) {
            throw new ApplicationException(ErrorCode.CommonForbidden);
        }

        final String email = authentication.getName();
        final UserRole role = getRole(authentication);
        log.debug("Refresh token for user. Email: '{}', role: '{}'", email, role);

        return create(email);
    }

    public UsernamePasswordAuthenticationToken verify(String token, TokenType type) {
        try {
            final DecodedJWT decoded = JWT.require(getAlgorithm())
                    .build()
                    .verify(token);

            final TokenType decodedType = decoded.getClaim(TOKEN_TYPE_CLAIM).as(TokenType.class);

            if (type != decodedType) {
                log.error("Invalid token type");
                return null;
            }

            final User user = userRepository.findByEmailAndToken(decoded.getSubject(), token).orElse(null);

            if (user == null) {
                log.error("Invalid token or token already replaced");
                return null;
            }

            return new UsernamePasswordAuthenticationToken(user, null, getAuthorities(user.getRole()));
        } catch (JWTVerificationException e) {
            log.error("Cannot parse JWT", e);
            return null;
        }
    }

    private TokenResponse create(String email) {
        final String access = createToken(email, TokenType.Access);
        final String refresh = createToken(email, TokenType.Refresh);

        final User user = userRepository.getByEmail(email);
        final UserToken userToken = user.getToken() == null
                ? new UserToken()
                : user.getToken();
        userToken.setAccess(access);
        userToken.setRefresh(refresh);
        user.setToken(userToken);
        userRepository.save(user);

        return new TokenResponse(
                access,
                refresh,
                toMillis(configuration.getAccessExpirationHours()),
                toMillis(configuration.getRefreshExpirationHours())
        );
    }

    private String createToken(String email, TokenType tokenType) {
        final int expirationHours = tokenType == TokenType.Access
                ? configuration.getAccessExpirationHours()
                : configuration.getRefreshExpirationHours();
        return JWT.create()
                .withSubject(email)
                .withClaim(TOKEN_TYPE_CLAIM, tokenType.name())
                .withExpiresAt(new Date(System.currentTimeMillis() + toMillis(expirationHours)))
                .sign(getAlgorithm());
    }

    private long toMillis(int hours) {
        return (long) hours * 60 * 60 * 1000;
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(configuration.getSecret());
    }

    private UserRole getRole(Authentication authentication) {
        final String authority = authentication.getAuthorities().iterator().next().getAuthority();
        return UserRole.valueOf(authority);
    }

    private Collection<SimpleGrantedAuthority> getAuthorities(UserRole role) {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }
}
