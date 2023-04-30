package com.backend.configuration.application;

import com.backend.core.message.common.Language;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.*;

@Configuration
public class LocaleConfiguration {

    private static final Locale FALLBACK_LOCALE = languageToLocale(Language.EN);

    @Bean
    public SessionLocaleResolver localeResolver() {
        final var resolver = new SessionLocaleResolver();
        resolver.setDefaultLocaleFunction(this::getLocaleFromRequest);
        return resolver;
    }

    private Locale getLocaleFromRequest(HttpServletRequest request) {
        final String header = request.getHeader(HttpHeaders.ACCEPT_LANGUAGE);
        final Language language = Language.valueOfLabel(header);
        if (language == null) {
            return FALLBACK_LOCALE;
        }
        return languageToLocale(language);
    }

    private static Locale languageToLocale(Language language) {
        final String[] separated = language.getLabel().split("-");
        return new Locale(separated[0], separated[1]);
    }
}
