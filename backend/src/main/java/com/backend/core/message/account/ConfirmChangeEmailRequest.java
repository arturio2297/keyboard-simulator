package com.backend.core.message.account;

import com.backend.core.validation.CodeConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class ConfirmChangeEmailRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @CodeConstraint
    private String code;
}
