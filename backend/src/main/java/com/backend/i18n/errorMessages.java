package com.backend.i18n;

import java.util.ListResourceBundle;

public class errorMessages extends ListResourceBundle {
    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"2000", "Invalid email or password"}
        };
    }
}
