package com.backend.i18n;

import java.util.ListResourceBundle;

public class errorMessages extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"1000", "Unknown server error"},
                {"1001", "Access denied"},
                {"1002", "Requested content not found"},
                {"1003", "Invalid request data"},
                {"2000", "Invalid email or password"},
                {"3000", "User with specified email already exists. Please try another email"},
                {"3001", "Invalid registration confirmation code. Please check the correctness of the entered code"},
                {"3002", "Registration confirmation code has already expired. Please retry registration"},
                {"4000", "User with specified email already exists. Please try another email"},
                {"4001", "Invalid change email confirmation code. Please check the correctness of the entered code"},
                {"4002", "Change email confirmation code has already expired. Please retry change email"},
                {"5000", "Invalid password recovery confirmation code. Please check the correctness of the entered code"},
                {"5001", "Password recovery confirmation code has already expired. Please retry password recovery"},
                {"5002", "User with specified email was not found. Please try enter another email"}
        };
    }
}
