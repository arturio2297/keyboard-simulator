package com.backend.core.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CodeValidator implements ConstraintValidator<CodeConstraint, String> {
    
    @Override
    public boolean isValid(String code, ConstraintValidatorContext constraintValidatorContext) {
        if (code == null) {
            return true;
        }
        return code.matches("^[0-9]{6}$");
    }
}
