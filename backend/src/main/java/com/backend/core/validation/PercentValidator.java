package com.backend.core.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PercentValidator implements ConstraintValidator<PercentConstraint, Double> {

    @Override
    public boolean isValid(Double value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            return true;
        }
        return value >= 0 && value <= 100;
    }
}
