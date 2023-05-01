package com.backend.service.storage;

import com.backend.core.message.file.FileResponse;
import io.minio.*;
import io.minio.errors.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ObjectStorageService {

    private final MinioClient client;
    private static final long PART_SIZE = 1024 * 1024 * 5; // Megabytes

    public String add(String bucket, InputStream is, long size, String contentType) {
        try {
            createBucketIfNotExists(bucket);
            final String object = getObjectName();
            client.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .stream(is, size, PART_SIZE)
                            .contentType(contentType)
                            .object(object)
                            .build()
            );
            return object;
        } catch (MinioException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Cannot add object", e);
        }
    }

    public String replace(String bucket, InputStream is, long size, String contentType, String object) {
        try {
            final FileResponse response = get(bucket, object);
            if (response.getResource().exists()) {
                delete(bucket, object);
            }
        } catch (Exception e) {
            // ignored
        }
        return add(bucket, is, size, contentType);
    }

    public void delete(String bucket, String object) {
        try {
            client.removeObject(RemoveObjectArgs.builder().bucket(bucket).object(object).build());
        } catch (MinioException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Cannot remove object", e);
        }
    }

    public FileResponse get(String bucket, String object) {
        try {
            final var response = client.getObject(GetObjectArgs.builder().bucket(bucket).object(object).build());
            final String contentType = response.headers().get("Content-Type");
            return new FileResponse(
                    new ByteArrayResource(response.readAllBytes()),
                    MediaType.valueOf(contentType));
        } catch (MinioException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Cannot get object", e);
        }
    }

    private void createBucketIfNotExists(String bucket) throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
        final boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
        if (!exists) {
            client.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
        }
    }

    private String getObjectName() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
