package com.backend.configuration.storage;

import java.util.ArrayList;
import java.util.List;

public class ObjectFoldedStructure {
    private final List<String> folders = new ArrayList<>();

    public ObjectFoldedStructure folder(String folder) {
        folders.add(folder);
        return this;
    }

    public String getObjectAbsolutePath(String objectName) {
        return String.join("/", new ArrayList<>() {{
            addAll(folders);
            add(objectName);
        }});
    }
}
