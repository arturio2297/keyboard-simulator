package com.backend.data.model.code;

import com.backend.data.model.EntityBase;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter@Setter
@Entity
@Table(name = "codes")
public class Code extends EntityBase {

    @Column(name = "value", columnDefinition = "VARCHAR(6) NOT NULL")
    private String value;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CodeType type;

    @Column(name = "requesting_date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime requestingDate;

    @Column(name = "expiration_date")
    private OffsetDateTime expirationDate;

    public boolean isExpired() {
        return expirationDate.isBefore(OffsetDateTime.now());
    }
}
