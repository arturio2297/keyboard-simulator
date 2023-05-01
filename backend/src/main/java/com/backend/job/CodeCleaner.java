package com.backend.job;

import com.backend.data.model.code.Code;
import com.backend.data.respository.CodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class CodeCleaner {

    private static final long TASK_DELAY_MILLIS = 60 * 60 * 1000 * 24;

    private final CodeRepository codeRepository;

    @Scheduled(fixedDelay = TASK_DELAY_MILLIS)
    public void clear() {
        final List<Code> codes = new ArrayList<>();

        log.debug("Start job to clear registration codes");

        for (Code code : codeRepository.findAll()) {
            if (code.isExpired()) {
                codes.add(code);
                log.debug("Registration code with email: '{}' expired", code.getEmail());
            }
        }

        codeRepository.deleteAll(codes);

        log.debug("Finish job to clear registration codes. Removed '{}' codes", codes.size());
    }
}
