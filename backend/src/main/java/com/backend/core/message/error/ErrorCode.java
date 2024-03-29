package com.backend.core.message.error;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    CommonUnknown(1000, HttpStatus.INTERNAL_SERVER_ERROR),
    CommonForbidden(1001, HttpStatus.FORBIDDEN),
    CommonNotFound(1002, HttpStatus.NOT_FOUND),
    CommonNotValid(1003, HttpStatus.BAD_REQUEST),

    AuthenticationBadCredentials(2000, HttpStatus.FORBIDDEN),

    RegistrationUserAlreadyExists(3000, HttpStatus.BAD_REQUEST),
    RegistrationInvalidCode(3001, HttpStatus.BAD_REQUEST),
    RegistrationCodeExpired(3002, HttpStatus.BAD_REQUEST),

    AccountUserAlreadyExists(4000, HttpStatus.BAD_REQUEST),
    AccountChangeEmailCodeNotFound(4001, HttpStatus.BAD_REQUEST),
    AccountChangeEmailCodeExpired(4002, HttpStatus.BAD_REQUEST),

    PasswordRecoveryCodeNotFound(5000, HttpStatus.BAD_REQUEST),
    PasswordRecoveryCodeExpired(5001, HttpStatus.BAD_REQUEST),
    PasswordRecoveryUserNotFound(5002, HttpStatus.BAD_REQUEST);

    @JsonValue
    private final int value;

    private final HttpStatus status;

    private ErrorCode(int value, HttpStatus status) {
        this.value = value;
        this.status = status;
    }
}
