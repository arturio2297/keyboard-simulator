package com.backend.controller;

import com.backend.core.exception.ApplicationException;
import com.backend.core.message.recovery.ConfirmRecoveryPasswordRequest;
import com.backend.core.message.recovery.SendRecoveryPasswordCodeRequest;
import com.backend.service.recovery.PasswordRecoveryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/password-recovery")
@Tag(name = "password recovery")
@RequiredArgsConstructor
public class PasswordRecovery {

    private final PasswordRecoveryService passwordRecoveryService;

    @PostMapping("/send-code")
    public void sendCode(@Valid @RequestBody SendRecoveryPasswordCodeRequest request) throws ApplicationException {
        passwordRecoveryService.sendCode(request);
    }

    @GetMapping("/check-code")
    public boolean checkCode(@RequestParam String codeValue, @RequestParam String email) {
        return passwordRecoveryService.checkCode(codeValue, email);
    }

    @PostMapping
    public void confirm(@Valid @RequestBody ConfirmRecoveryPasswordRequest request) throws ApplicationException {
        passwordRecoveryService.confirm(request);
    }
}
