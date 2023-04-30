package com.backend.i18n;

import java.util.ListResourceBundle;

public class mailMessages extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"registrationSubject", "Registration in Keyboard Simulator"},
                {"registrationText", "Your registration confirmation code: {0}"}
        };
    }
}
