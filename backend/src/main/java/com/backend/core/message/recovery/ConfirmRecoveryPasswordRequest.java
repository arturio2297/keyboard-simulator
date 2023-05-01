package com.backend.core.message.recovery;

import com.backend.core.validation.CodeConstraint;
import com.backend.core.validation.PasswordConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class ConfirmRecoveryPasswordRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @CodeConstraint
    private String code;

    @NotBlank
    @PasswordConstraint
    private String password;
}
