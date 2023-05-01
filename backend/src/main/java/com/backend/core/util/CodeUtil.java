package com.backend.core.util;

import org.apache.commons.lang3.RandomStringUtils;

public class CodeUtil {
    public static String getCode() {
        return RandomStringUtils.random(6, false, true);
    }
}
