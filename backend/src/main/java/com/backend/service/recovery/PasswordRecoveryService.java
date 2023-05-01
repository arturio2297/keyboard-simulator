package com.backend.service.recovery;

import com.backend.configuration.application.ApplicationConfiguration;
import com.backend.core.exception.ApplicationException;
import com.backend.core.message.error.ErrorCode;
import com.backend.core.message.recovery.ConfirmRecoveryPasswordRequest;
import com.backend.core.message.recovery.SendPasswordRecoveryCodeRequest;
import com.backend.core.util.CodeUtil;
import com.backend.data.model.code.Code;
import com.backend.data.model.code.CodeType;
import com.backend.data.model.user.User;
import com.backend.data.respository.CodeRepository;
import com.backend.data.respository.UserRepository;
import com.backend.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class PasswordRecoveryService {

    private final CodeRepository codeRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ApplicationConfiguration configuration;
    private final PasswordEncoder passwordEncoder;

    public void sendCode(SendPasswordRecoveryCodeRequest request) {
        final Code code = codeRepository.findByEmailAndType(
                request.getEmail(),
                CodeType.RecoveryPassword
        ).orElseGet(Code::new);

        final String codeValue = CodeUtil.getCode();
        final OffsetDateTime requestingDate = OffsetDateTime.now();
        final OffsetDateTime expirationDate = requestingDate.plusHours(
                configuration.getCodeExpirationHours().getRecoveryPassword()
        );

        code.setValue(codeValue);
        code.setEmail(request.getEmail());
        code.setType(CodeType.RecoveryPassword);
        code.setRequestingDate(requestingDate);
        code.setExpirationDate(expirationDate);

        emailService.sendRecoveryPasswordCode(request.getEmail(), codeValue);
        codeRepository.save(code);
    }

    public boolean checkCode(String codeValue, String email) {
        final Code code = codeRepository.findByValueAndEmailAndType(
                codeValue,
                email,
                CodeType.RecoveryPassword
        ).orElse(null);

        return code != null && !code.isExpired();
    }

    public void confirm(ConfirmRecoveryPasswordRequest request) throws ApplicationException {
        final Code code = codeRepository.findByValueAndEmailAndType(
                request.getCode(),
                request.getEmail(),
                CodeType.RecoveryPassword
        ).orElseThrow(() -> new ApplicationException(ErrorCode.PasswordRecoveryCodeNotFound));

        if (code.isExpired()) {
            throw new ApplicationException(ErrorCode.PasswordRecoveryCodeExpired);
        }

        final User user = userRepository.getByEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        codeRepository.delete(code);
    }
}
