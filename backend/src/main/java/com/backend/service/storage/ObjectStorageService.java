package com.backend.service.storage;

import com.backend.configuration.storage.ObjectFoldedStructure;
import com.backend.configuration.storage.ObjectStorageConfiguration;
import com.backend.core.exception.ApplicationException;
import com.backend.core.message.error.ErrorCode;
import com.backend.core.message.file.FileResponse;
import com.backend.core.util.FileUtil;
import io.minio.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ObjectStorageService {

    private final MinioClient client;
    private static final long PART_SIZE = -1L;
    private final ObjectStorageConfiguration configuration;

    public String add(MultipartFile file, ObjectFoldedStructure foldedStructure) throws ApplicationException {
        try {
            final String object = getObjectName(foldedStructure, file.getOriginalFilename());
            client.putObject(PutObjectArgs.builder()
                            .bucket(configuration.getBucket())
                            .region(configuration.getRegion())
                            .stream(file.getInputStream(), file.getSize(), PART_SIZE)
                            .contentType(file.getContentType())
                            .object(object)
                            .build());
            return object;
        } catch (Exception e) {
            log.error("Cannot add file", e);
            throw new ApplicationException(ErrorCode.CommonUnknown);
        }
    }

    public String replace(MultipartFile file, ObjectFoldedStructure foldedStructure,
                          @Nullable String removableObjectName) throws ApplicationException {
        if (removableObjectName != null) {
            try {
                final FileResponse response = get(removableObjectName);
                if (response.getResource().exists()) {
                    delete(removableObjectName);
                }
            } catch (ApplicationException e) {
                // ignored
            }
        }
        return add(file, foldedStructure);
    }

    public void delete(String objectName) throws ApplicationException {
        try {
            client.removeObject(RemoveObjectArgs.builder()
                    .bucket(configuration.getBucket())
                    .region(configuration.getRegion())
                    .object(objectName).build());
        } catch (Exception e) {
            log.error("Cannot delete file", e);
            throw new ApplicationException(ErrorCode.CommonUnknown);
        }
    }

    public FileResponse get(String objectName) throws ApplicationException {
        try {
            final var response = client.getObject(
                    GetObjectArgs.builder()
                            .bucket(configuration.getBucket())
                            .region(configuration.getRegion())
                            .object(objectName)
                            .build());
            final Resource resource = new ByteArrayResource(response.readAllBytes());
            final String contentType = response.headers().get("Content-Type");
            return new FileResponse(resource, MediaType.valueOf(contentType));
        } catch (Exception e) {
            log.error("Cannot get file", e);
            throw new ApplicationException(ErrorCode.CommonUnknown);
        }
    }

    public void addBucket() {
        try {
            final boolean exists = client.bucketExists(BucketExistsArgs.builder()
                    .bucket(configuration.getBucket())
                    .region(configuration.getRegion())
                    .build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder()
                        .bucket(configuration.getBucket())
                        .region(configuration.getRegion())
                        .build());
                log.debug("Bucket already created");
            } else {
                log.debug("Bucket already created. Skip");
            }
        } catch (Exception e) {
            log.error("Cannot create bucket", e);
        }
    }

    private String getObjectName(ObjectFoldedStructure foldedStructure, String filename) {
        final String objectId = UUID.randomUUID().toString().replaceAll("-", "");
        final String ext = FileUtil.getExtension(filename);
        final String objectName = objectId + "." + ext;
        return foldedStructure.getObjectAbsolutePath(objectName);
    }
}
