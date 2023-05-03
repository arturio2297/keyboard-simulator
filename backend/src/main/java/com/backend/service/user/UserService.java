package com.backend.service.user;

import com.backend.configuration.application.ApplicationConfiguration.DefaultUser;
import com.backend.configuration.storage.ObjectStorageConfiguration;
import com.backend.core.exception.ApplicationException;
import com.backend.core.message.error.ErrorCode;
import com.backend.core.message.file.FileResponse;
import com.backend.data.model.user.User;
import com.backend.data.respository.UserRepository;
import com.backend.service.storage.ObjectStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
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
    private final ObjectStorageConfiguration objectStorageConfiguration;
    private final ObjectStorageService objectStorageService;

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

    public FileResponse getAvatar(Long userId) throws ApplicationException {
        final User user = userRepository.findById(userId).orElse(null);

        if (user == null || user.getAvatarObjectName() == null) {
            throw new ApplicationException(ErrorCode.CommonNotFound);
        }

        return objectStorageService.get(user.getAvatarObjectName());
    }
}
