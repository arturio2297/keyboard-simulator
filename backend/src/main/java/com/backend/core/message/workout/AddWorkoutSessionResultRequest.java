package com.backend.core.message.workout;

import com.backend.core.validation.PercentConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class AddWorkoutSessionResultRequest {
    @NotNull
    @Min(value = 0)
    private Double speed;

    @NotNull
    @Min(value = 0)
    private Integer time;

    @NotNull
    @PercentConstraint
    private Double accuracy;

    @NotNull
    @Min(value = 1)
    private Integer letters;

    @NotNull
    @Min(value = 1)
    private Integer words;

    @NotNull
    @Min(value = 1)
    private Integer paragraphs;
}
