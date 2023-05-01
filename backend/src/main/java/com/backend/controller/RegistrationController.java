package com.backend.controller;

import com.backend.core.exception.ApplicationException;
import com.backend.core.message.registration.ConfirmRegistrationRequest;
import com.backend.core.message.registration.SendRegistrationCodeRequest;
import com.backend.service.registration.RegistrationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/register")
@Tag(name = "registration")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/send-code")
    public void SendCode(@Valid @RequestBody SendRegistrationCodeRequest request) throws ApplicationException {
        registrationService.sendCode(request);
    }

    @PostMapping
    public void confirm(@Valid @RequestBody ConfirmRegistrationRequest request) throws ApplicationException {
        registrationService.confirm(request);
    }
}
