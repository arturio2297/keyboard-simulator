package com.backend.core.message.account;

import com.backend.core.validation.PasswordConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class UpdatePasswordRequest {
    @NotBlank
    @PasswordConstraint
    private String password;
}
