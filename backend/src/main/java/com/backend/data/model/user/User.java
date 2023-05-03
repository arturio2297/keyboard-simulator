package com.backend.data.model.user;

import com.backend.data.model.EntityBase;
import com.backend.data.model.workout.WorkoutSessionResult;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter@Setter
@Entity
@Table(name = "users")
public class User extends EntityBase {

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "registration_date", columnDefinition = "TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()")
    private OffsetDateTime registrationDate;

    @Column(name = "active")
    private boolean active;

    @Column(name = "avatar_object_name")
    private String avatarObjectName;

    @OneToOne(cascade = CascadeType.ALL)
    private UserToken token;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WorkoutSessionResult> workoutSessionResults = new ArrayList<>();

    public String getFullname() {
        return String.join(" ", firstname, lastname);
    }
}
