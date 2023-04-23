package com.backend.configuration.security.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter@Setter
@Configuration
@ConfigurationProperties(prefix = "auth")
public class AuthenticationConfiguration {
    private int accessExpirationHours;
    private int refreshExpirationHours;
    private String secret;
}
