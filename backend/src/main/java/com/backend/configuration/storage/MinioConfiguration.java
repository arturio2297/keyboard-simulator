package com.backend.configuration.storage;

import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class MinioConfiguration {

    private final ObjectStorageConfiguration configuration;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(configuration.getUrl(), configuration.getPort(), configuration.isSecure())
                .credentials(configuration.getAccessKey(), configuration.getSecretKey())
                .region(configuration.getRegion())
                .build();
    }
}
