package com.backend.service.registration;

import com.backend.configuration.application.ApplicationConfiguration;
import com.backend.core.exception.ApplicationException;
import com.backend.core.message.error.ErrorCode;
import com.backend.core.message.registration.ConfirmRegistrationRequest;
import com.backend.core.message.registration.SendRegistrationCodeRequest;
import com.backend.core.util.CodeUtil;
import com.backend.data.model.code.Code;
import com.backend.data.model.code.CodeType;
import com.backend.data.model.user.User;
import com.backend.data.model.user.UserRole;
import com.backend.data.respository.CodeRepository;
import com.backend.data.respository.UserRepository;
import com.backend.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final ApplicationConfiguration configuration;
    private final CodeRepository codeRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public void sendCode(SendRegistrationCodeRequest request) throws ApplicationException {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApplicationException(ErrorCode.RegistrationUserAlreadyExists);
        }

        final Code code = codeRepository.findByEmailAndType(request.getEmail(), CodeType.Registration)
                .orElseGet(Code::new);

        final String codeValue = CodeUtil.getCode();
        final OffsetDateTime requestingDate = OffsetDateTime.now();
        final OffsetDateTime expirationDate = requestingDate.plusHours(configuration.getCodeExpirationHours().getRegistration());

        code.setValue(codeValue);
        code.setEmail(request.getEmail());
        code.setType(CodeType.Registration);
        code.setRequestingDate(requestingDate);
        code.setExpirationDate(expirationDate);

        emailService.sendRegistrationCode(request.getEmail(), codeValue);

        codeRepository.save(code);
    }

    public void confirm(ConfirmRegistrationRequest request) throws ApplicationException {
        final Code code = codeRepository.findByValueAndEmailAndType(
                request.getCode(),
                request.getEmail(),
                CodeType.Registration
        ).orElseThrow(() -> new ApplicationException(ErrorCode.RegistrationInvalidCode));

        if (code.isExpired()) {
            throw new ApplicationException(ErrorCode.RegistrationCodeExpired);
        }

        final User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.User);
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setActive(true);
        user.setRegistrationDate(OffsetDateTime.now());

        userRepository.save(user);
        codeRepository.delete(code);
    }
}
