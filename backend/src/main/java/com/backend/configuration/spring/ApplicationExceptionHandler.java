package com.backend.configuration.spring;

import com.backend.core.exception.ApplicationException;
import com.backend.core.message.error.ErrorCode;
import com.backend.core.message.error.ErrorResponse;
import com.backend.service.locale.LocaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class ApplicationExceptionHandler {

    private final LocaleService localeService;

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorResponse> handle(ApplicationException e) {
        return ResponseEntity
                .status(e.getCode().getStatus())
                .body(getResponseBody(e.getCode()));
    }

    private ErrorResponse getResponseBody(ErrorCode code) {
        final String message = localeService.getMessage("errorMessages", String.valueOf(code.getValue()));
        return new ErrorResponse(code, message);
    }
}
