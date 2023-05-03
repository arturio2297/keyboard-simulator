package com.backend.controller;

import com.backend.core.message.workout.AddWorkoutSessionResultRequest;
import com.backend.core.message.workout.WorkoutSessionResultDTO;
import com.backend.service.workout.WorkoutService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/workout")
@Tag(name = "workout")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping
    public WorkoutSessionResultDTO add(@Valid @RequestBody AddWorkoutSessionResultRequest request) {
        return new WorkoutSessionResultDTO(workoutService.add(request));
    }
}
