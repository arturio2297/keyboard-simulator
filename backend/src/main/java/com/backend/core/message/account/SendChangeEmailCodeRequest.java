package com.backend.core.message.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class SendChangeEmailCodeRequest {
    @NotBlank
    @Email
    private String email;
}
