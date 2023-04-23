package com.backend.core.message.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@AllArgsConstructor
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    private long accessExpiresIn;
    private long refreshExpiresIn;
}
