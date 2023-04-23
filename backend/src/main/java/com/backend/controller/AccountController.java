package com.backend.controller;

import com.backend.core.message.account.AccountDTO;
import com.backend.service.account.AccountService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
