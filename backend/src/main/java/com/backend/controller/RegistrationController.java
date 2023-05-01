package com.backend.controller;

import com.backend.core.exception.ApplicationException;
import com.backend.core.message.registration.ConfirmRegistrationRequest;
import com.backend.core.message.registration.SendRegistrationCodeRequest;
import com.backend.service.registration.RegistrationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/register")
@Tag(name = "registration")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/send-code")
    public void sendCode(@Valid @RequestBody SendRegistrationCodeRequest request) throws ApplicationException {
        registrationService.sendCode(request);
    }

    @GetMapping("/check-code")
    public boolean checkCode(@RequestParam String codeValue, @RequestParam String email) {
        return registrationService.checkCode(codeValue, email);
    }

    @PostMapping
    public void confirm(@Valid @RequestBody ConfirmRegistrationRequest request) throws ApplicationException {
        registrationService.confirm(request);
    }
}
