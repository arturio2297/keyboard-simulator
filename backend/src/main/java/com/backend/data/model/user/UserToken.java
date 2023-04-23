package com.backend.data.model.user;

import com.backend.data.model.EntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@Entity
@Table(name = "tokens")
public class UserToken extends EntityBase {

    @Column(name = "access", nullable = false)
    private String access;

    @Column(name = "refresh", nullable = false)
    private String refresh;

    @OneToOne(mappedBy = "token")
    private User user;
}
