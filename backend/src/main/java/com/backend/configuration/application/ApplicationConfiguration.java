package com.backend.configuration.application;

import com.backend.data.model.user.UserRole;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Getter@Setter
@Configuration
@ConfigurationProperties(prefix = "app")
public class ApplicationConfiguration {

    private DefaultUser admin;
    private DefaultUser user;

    public List<DefaultUser> getDefaultUsers() {
        return List.of(admin, user);
    }

    @Getter@Setter
    public static class DefaultUser {
        private String email;
        private String firstname;
        private String lastname;
        private String password;
        private UserRole role;
    }
}
