package com.backend.controller;

import com.backend.core.message.account.AccountDTO;
import com.backend.core.message.account.UpdateAccountRequest;
import com.backend.service.account.AccountService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/account")
@Tag(name = "account")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public AccountDTO get() {
        return new AccountDTO(accountService.get());
    }

    @PostMapping
    public AccountDTO update(@Valid @RequestBody UpdateAccountRequest request) {
        return new AccountDTO(accountService.update(request));
    }

    @PostMapping(value = "/avatar", consumes = "multipart/form-data")
    public void updateAvatar(@RequestPart MultipartFile avatar) {
        accountService.updateAvatar(avatar);
    }
}
