package com.backend.service.account;

import com.backend.configuration.application.ApplicationConfiguration;
import com.backend.configuration.storage.ObjectFoldedStructure;
import com.backend.configuration.storage.ObjectStorageConfiguration;
import com.backend.core.exception.ApplicationException;
import com.backend.core.message.account.ConfirmChangeEmailRequest;
import com.backend.core.message.account.SendChangeEmailCodeRequest;
import com.backend.core.message.account.UpdateAccountRequest;
import com.backend.core.message.account.UpdatePasswordRequest;
import com.backend.core.message.error.ErrorCode;
import com.backend.core.util.CodeUtil;
import com.backend.data.model.code.Code;
import com.backend.data.model.code.CodeType;
import com.backend.data.model.user.User;
import com.backend.data.respository.CodeRepository;
import com.backend.data.respository.UserRepository;
import com.backend.service.email.EmailService;
import com.backend.service.image.ImageService;
import com.backend.service.storage.ObjectStorageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final ImageService imageService;
    private final ObjectStorageService objectStorageService;
    private final ApplicationConfiguration applicationConfiguration;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final CodeRepository codeRepository;

    public User get() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public void updateAvatar(MultipartFile avatar) throws ApplicationException {
        final User user = get();

        final MultipartFile resizedAvatar = imageService.resizeAvatar(avatar);
        final String avatarObjectName = objectStorageService.replace(resizedAvatar,
                new ObjectFoldedStructure()
                        .folder("avatars")
                        .folder(String.valueOf(user.getId())),
                user.getAvatarObjectName());

        user.setAvatarObjectName(avatarObjectName);

        userRepository.save(user);
    }

    public User update(UpdateAccountRequest request) {
        final User user = get();

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());

        return userRepository.save(user);
    }

    public boolean checkPassword(String password) {
        return passwordEncoder.matches(password, get().getPassword());
    }

    public void updatePassword(UpdatePasswordRequest request) {
        final User user = get();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    public void sendChangeEmailCode(SendChangeEmailCodeRequest request) throws ApplicationException {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApplicationException(ErrorCode.AccountUserAlreadyExists);
        }

        if (StringUtils.equals(get().getEmail(), request.getEmail())) {
            throw new ApplicationException(ErrorCode.CommonNotValid);
        }

        final Code code = codeRepository.findByEmailAndType(request.getEmail(), CodeType.ChangeEmail)
                .orElseGet(Code::new);
        final OffsetDateTime requestingDate = OffsetDateTime.now();
        final OffsetDateTime expirationDate = requestingDate.plusHours(
                applicationConfiguration.getCodeExpirationHours().getChangeEmail()
        );

        final String codeValue = CodeUtil.getCode();

        code.setEmail(request.getEmail());
        code.setValue(codeValue);
        code.setType(CodeType.ChangeEmail);
        code.setRequestingDate(requestingDate);
        code.setExpirationDate(expirationDate);

        emailService.sendChangeEmailCode(request.getEmail(), codeValue);
        codeRepository.save(code);
    }

    public void confirmChangeEmail(ConfirmChangeEmailRequest request) throws ApplicationException {
        final Code code = codeRepository.findByValueAndEmailAndType(
                request.getCode(),
                request.getEmail(),
                CodeType.ChangeEmail
        ).orElseThrow(() -> new ApplicationException(ErrorCode.AccountChangeEmailCodeNotFound));

        final User user = get();

        if (StringUtils.equals(user.getEmail(), request.getEmail())) {
            throw new ApplicationException(ErrorCode.CommonNotValid);
        }

        user.setEmail(request.getEmail());

        userRepository.save(user);
        codeRepository.delete(code);
    }
}
