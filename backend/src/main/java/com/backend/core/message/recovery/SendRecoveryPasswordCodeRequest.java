package com.backend.core.message.recovery;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class SendRecoveryPasswordCodeRequest {
    @NotBlank
    @Email
    private String email;
}
