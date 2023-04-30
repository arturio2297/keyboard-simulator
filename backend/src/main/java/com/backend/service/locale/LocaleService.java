package com.backend.service.locale;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.ResourceBundle;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocaleService {

    @Value("${app.locales.package}")
    private String localesPackage;

    public String getMessage(String bundleName, String key) {
        return getBundle(bundleName).getString(key);
    }

    public String getMessage(String bundleName, String key, Locale locale) {
        return getBundle(bundleName, locale).getString(key);
    }

    public ResourceBundle getBundle(String name) {
        return getBundle(name, getLocale());
    }

    public ResourceBundle getBundle(String name, Locale locale) {
        return ResourceBundle.getBundle(getBundleBasename(name), locale);
    }

    public Locale getLocale() {
        return LocaleContextHolder.getLocale();
    }

    private String getBundleBasename(String bundleName) {
        return localesPackage.concat("." + bundleName);
    }
}
