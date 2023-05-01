package com.backend.core.message.account;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class UpdateAccountRequest {

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;
}
