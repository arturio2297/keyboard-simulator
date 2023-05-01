package com.backend.i18n;

import java.util.ListResourceBundle;

public class errorMessages_en_US extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"2000", "Invalid email or password"},
                {"3000", "User with specified email already exists. Try another email"},
                {"3001", "Invalid registration confirmation code. Try enter another code"},
                {"3002", "Registration confirmation code has already expired. Retry registration"}
        };
    }
}
