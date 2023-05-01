package com.backend.core.message.file;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

@Getter@Setter
@AllArgsConstructor
public class FileResponse {
    private Resource resource;
    private MediaType type;
}
