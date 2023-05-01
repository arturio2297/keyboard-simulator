package com.backend.i18n;

import java.util.ListResourceBundle;

public class mailMessages_en_US extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"registrationSubject", "Registration in Keyboard Simulator"},
                {"registrationText", "Your registration confirmation code: {0}"},
                {"changeEmailSubject", "Change email in Keyboard Simulator"},
                {"changeEmailText", "Your change email confirmation code: {0}"}
        };
    }
}
