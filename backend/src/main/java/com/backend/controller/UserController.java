package com.backend.controller;

import com.backend.core.exception.ApplicationException;
import com.backend.core.message.file.FileResponse;
import com.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@Tag(name = "user")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/avatar/{id}")
    public ResponseEntity<Resource> getAvatar(@PathVariable Long id) throws ApplicationException {
        final FileResponse response = userService.getAvatar(id);
        return ResponseEntity.ok()
                .contentType(response.getType())
                .body(response.getResource());
    }
}
