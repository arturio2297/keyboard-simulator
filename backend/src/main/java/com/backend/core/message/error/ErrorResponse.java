package com.backend.core.message.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@AllArgsConstructor
public class ErrorResponse {
    private ErrorCode code;
    private String message;
}
