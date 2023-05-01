package com.backend.i18n;

import java.util.ListResourceBundle;

public class mailMessages_ru_RU extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"registrationSubject", "Регистрация в Keyboard Simulator"},
                {"registrationText", "Ваш код для подтверждения регистрации: {0}"},
                {"changeEmailSubject", "Смена email в Keyboard Simulator"},
                {"changeEmailText", "Ваш код подтверждения смены email: {0}"}
        };
    }
}
