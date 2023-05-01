package com.backend.core.message.registration;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class SendRegistrationCodeRequest {
    @NotBlank
    @Email
    private String email;
}
