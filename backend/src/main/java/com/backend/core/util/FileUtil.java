package com.backend.core.util;

import org.apache.commons.compress.utils.FileNameUtils;

import java.net.URLConnection;

public class FileUtil {
    public static String getContentType(String filename) {
        return URLConnection.guessContentTypeFromName(filename);
    }

    public static String getExtension(String filename) {
        return FileNameUtils.getExtension(filename);
    }
}
