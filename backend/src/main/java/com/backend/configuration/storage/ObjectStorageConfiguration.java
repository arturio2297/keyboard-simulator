package com.backend.configuration.storage;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter@Setter
@Configuration
@ConfigurationProperties(prefix = "storage")
public class ObjectStorageConfiguration {
    private String url;
    private int port;
    private boolean secure;
    private String accessKey;
    private String secretKey;
    private String region;
    private String bucket;
}
