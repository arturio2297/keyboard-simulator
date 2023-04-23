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

    AuthenticationBadCredentials(2000, HttpStatus.FORBIDDEN);

    @JsonValue
    private final int value;

    private final HttpStatus status;

    private ErrorCode(int value, HttpStatus status) {
        this.value = value;
        this.status = status;
    }
}
