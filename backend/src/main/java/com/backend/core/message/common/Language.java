package com.backend.core.message.common;

import lombok.Getter;

@Getter
public enum Language {
    EN("en-US"),
    RU("ru-RU");

    private final String label;

    private Language(String label) {
        this.label = label;
    }

    public static Language valueOfLabel(String label) {
        for (Language language : values()) {
            if (language.label.equals(label)) {
                return language;
            }
        }
        return null;
    }
}
