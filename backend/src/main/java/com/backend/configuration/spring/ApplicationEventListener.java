package com.backend.configuration.spring;

import com.backend.configuration.application.ApplicationConfiguration;
import com.backend.service.storage.ObjectStorageService;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApplicationEventListener {

    private final ApplicationConfiguration applicationConfiguration;
    private final UserService userService;
    private final ObjectStorageService objectStorageService;

    @EventListener(ApplicationReadyEvent.class)
    public void handleApplicationReady() {
        userService.init(applicationConfiguration.getDefaultUsers());
        objectStorageService.addBucket();
    }
}
