package com.backend.data.model.workout;

import com.backend.data.model.EntityBase;
import com.backend.data.model.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter@Setter
@Entity
@Table(name = "workout_session_results")
public class WorkoutSessionResult extends EntityBase {

    @Column(name = "speed", columnDefinition = "DECIMAL(4,2) NOT NULL")
    private double speed;

    @Column(name = "time", nullable = false)
    private int time;

    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()")
    private OffsetDateTime date;

    @Column(name = "accuracy", columnDefinition = "DECIMAL(5, 2) NOT NULL")
    private double accuracy;

    @Column(name = "letters", nullable = false)
    private int letters;

    @Column(name = "words", nullable = false)
    private int words;

    @Column(name = "paragraphs", nullable = false)
    private int paragraphs;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
