package com.backend.core.message.workout;

import com.backend.data.model.workout.WorkoutSessionResult;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter@Setter
public class WorkoutSessionResultDTO {
    private Long id;
    private Long userId;
    private String userFullname;
    private Double speed;
    private Integer time;
    private OffsetDateTime date;
    private Double accuracy;
    private Integer letters;
    private Integer words;
    private Integer paragraphs;

    public WorkoutSessionResultDTO(WorkoutSessionResult result) {
        this.id = result.getId();
        this.userId = result.getUser().getId();
        this.userFullname = result.getUser().getFullname();
        this.speed = result.getSpeed();
        this.time = result.getTime();
        this.date = result.getDate();
        this.accuracy = result.getAccuracy();
        this.letters = result.getLetters();
        this.words = result.getWords();
        this.paragraphs = result.getParagraphs();
    }
}
