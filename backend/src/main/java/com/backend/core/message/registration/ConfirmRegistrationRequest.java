package com.backend.core.message.registration;

import com.backend.core.validation.CodeConstraint;
import com.backend.core.validation.PasswordConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class ConfirmRegistrationRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    @NotBlank
    @PasswordConstraint
    private String password;

    @NotBlank
    @CodeConstraint
    private String code;
}
