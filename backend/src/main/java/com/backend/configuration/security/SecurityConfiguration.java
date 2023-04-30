package com.backend.configuration.security;

import com.backend.configuration.security.auth.AuthorizationFilter;
import com.backend.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;

    private AuthorizationFilter getAuthorizationFilter() {
        return new AuthorizationFilter(authenticationManager, authService);
    }

    @Bean
    public SecurityFilterChain chain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .httpBasic().disable()
                .authorizeHttpRequests()

                // public >>>
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/test/**").permitAll()
                .requestMatchers("/api/v1/text/**").permitAll()
                .requestMatchers("/api/v1/register/**").permitAll()
                .requestMatchers("/api/v1/password-recovery/**").permitAll()
                // public <<<

                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .addFilter(getAuthorizationFilter())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
}
