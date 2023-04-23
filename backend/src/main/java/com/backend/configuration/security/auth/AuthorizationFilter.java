package com.backend.configuration.security.auth;

import com.backend.core.message.auth.TokenType;
import com.backend.service.auth.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class AuthorizationFilter extends BasicAuthenticationFilter {

    private final AuthService authService;

    public AuthorizationFilter(AuthenticationManager authenticationManager, AuthService authService) {
        super(authenticationManager);
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer ")) {
            authenticate(header);
        }
        chain.doFilter(request, response);
    }

    private void authenticate(String header) {
        final String token = header.replace("Bearer ", "");
        final var authentication = authService.verify(token, TokenType.Access);
        if (authentication != null) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}
