package com.backend.data.respository;

import com.backend.data.model.workout.WorkoutSessionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutSessionResultRepository extends JpaRepository<WorkoutSessionResult, Long> {
}
