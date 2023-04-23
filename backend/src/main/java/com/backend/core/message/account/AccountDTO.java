package com.backend.core.message.account;

import com.backend.data.model.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter@Setter
public class AccountDTO {
    private Long id;
    private String email;
    private String firstname;
    private String lastname;
    private OffsetDateTime registrationDate;

    public AccountDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.registrationDate = user.getRegistrationDate();
    }
}
