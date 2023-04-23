package com.backend.service.user;

import com.backend.configuration.application.ApplicationConfiguration;
import com.backend.configuration.application.ApplicationConfiguration.DefaultUser;
import com.backend.data.model.user.User;
import com.backend.data.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void init(List<DefaultUser> users) {
        for (DefaultUser defaultUser : users) {
            if (userRepository.existsByEmail(defaultUser.getEmail())) {
                log.debug("User with email: '{}' already created. Skip creation", defaultUser.getEmail());
                continue;
            }

            final User user = new User();

            user.setEmail(defaultUser.getEmail());
            user.setFirstname(defaultUser.getFirstname());
            user.setLastname(defaultUser.getLastname());
            user.setRole(defaultUser.getRole());
            user.setPassword(passwordEncoder.encode(defaultUser.getPassword()));
            user.setRegistrationDate(OffsetDateTime.now());
            user.setActive(true);

            userRepository.save(user);

            log.debug("User with email: '{}' successfully created", defaultUser.getEmail());
        }
    }
}
