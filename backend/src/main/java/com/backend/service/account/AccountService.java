package com.backend.service.account;

import com.backend.data.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    public User get() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
