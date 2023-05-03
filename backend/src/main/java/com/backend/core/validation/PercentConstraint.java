package com.backend.core.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PercentValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface PercentConstraint {
    String message() default "Invalid code";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
