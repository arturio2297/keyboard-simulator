package com.backend.i18n;

import java.util.ListResourceBundle;

public class errorMessages_en_US extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"1000", "Unknown server error"},
                {"1001", "Access denied"},
                {"1002", "Requested content not found"},
                {"1003", "Invalid request data"},
                {"2000", "Invalid email or password"},
                {"3000", "User with specified email already exists. Try another email"},
                {"3001", "Invalid registration confirmation code. Try enter another code"},
                {"3002", "Registration confirmation code has already expired. Retry registration"}
        };
    }
}
