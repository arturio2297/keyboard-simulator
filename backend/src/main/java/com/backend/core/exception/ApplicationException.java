package com.backend.core.exception;

import com.backend.core.message.error.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApplicationException extends Throwable {
    private ErrorCode code;
}
