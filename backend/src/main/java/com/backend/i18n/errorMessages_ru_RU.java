package com.backend.i18n;

import java.util.ListResourceBundle;

public class errorMessages_ru_RU extends ListResourceBundle {
    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"2000", "Неверный email или пароль"}
        };
    }
}
