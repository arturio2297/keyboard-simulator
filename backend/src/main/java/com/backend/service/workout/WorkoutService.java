package com.backend.service.workout;

import com.backend.core.message.workout.AddWorkoutSessionResultRequest;
import com.backend.data.model.workout.WorkoutSessionResult;
import com.backend.data.respository.WorkoutSessionResultRepository;
import com.backend.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final AccountService accountService;
    private final WorkoutSessionResultRepository workoutSessionResultRepository;

    public WorkoutSessionResult add(AddWorkoutSessionResultRequest request) {
        final WorkoutSessionResult result = new WorkoutSessionResult();

        result.setSpeed(request.getSpeed());
        result.setTime(request.getTime());
        result.setDate(OffsetDateTime.now());
        result.setAccuracy(request.getAccuracy());
        result.setLetters(request.getLetters());
        result.setWords(request.getWords());
        result.setParagraphs(request.getParagraphs());
        result.setUser(accountService.get());

        return workoutSessionResultRepository.save(result);
    }
}
