package com.backend.controller;

import com.backend.core.exception.ApplicationException;
import com.backend.core.message.auth.LoginRequest;
import com.backend.core.message.auth.RefreshTokenRequest;
import com.backend.core.message.auth.TokenResponse;
import com.backend.core.message.auth.TokenType;
import com.backend.data.model.user.UserRole;
import com.backend.service.auth.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login-admin")
    TokenResponse loginAdmin(@Valid @RequestBody LoginRequest request) throws ApplicationException {
        return authService.authenticate(request.getEmail(), request.getPassword(), UserRole.Admin);
    }

    @PostMapping("/login-user")
    TokenResponse loginUser(@Valid @RequestBody LoginRequest request) throws ApplicationException {
        return authService.authenticate(request.getEmail(), request.getPassword(), UserRole.User);
    }

    @PostMapping("/refresh")
    TokenResponse refresh(@Valid @RequestBody RefreshTokenRequest request) throws ApplicationException {
        return authService.refresh(request.getRefreshToken());
    }

    @GetMapping("/check")
    boolean checkToken(@RequestParam String token, @RequestParam TokenType type) {
        return authService.verify(token, type) != null;
    }
}
