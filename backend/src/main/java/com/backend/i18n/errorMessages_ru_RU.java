package com.backend.i18n;

import java.util.ListResourceBundle;

public class errorMessages_ru_RU extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {
        return new Object[][] {
                {"2000", "Invalid email or password"},
                {"3000", "Пользователь с указанным email уже существует. Попробуйте другой email"},
                {"3001", "Неверный код подтверждения регистрации. Попробуйте ввести другой код"},
                {"3002", "Время жизни кода подтверждения регистрации истекло. Повторите процесс регистрации"}
        };
    }
}
