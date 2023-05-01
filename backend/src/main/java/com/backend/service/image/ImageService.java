package com.backend.service.image;

import com.backend.configuration.image.ImageConfiguration;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.imgscalr.Scalr;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageConfiguration imageConfiguration;

    public ResizeImageResult resizeAvatar(MultipartFile avatar) {
        return resize(avatar, imageConfiguration.getAvatarWidth());
    }

    private ResizeImageResult resize(MultipartFile file, int width) {
        try {
            final BufferedImage original = ImageIO.read(file.getInputStream());
            final BufferedImage resized = Scalr.resize(original, width);
            final ByteArrayOutputStream os = new ByteArrayOutputStream();
            final String extension = file.getContentType().split("/")[1];
            ImageIO.write(resized, extension, os);
            return new ResizeImageResult(
                    new ByteArrayInputStream(os.toByteArray()),
                    os.size());
        } catch (IOException e) {
            throw new RuntimeException("Cannot resize image", e);
        }
    }

    @Getter@Setter
    @AllArgsConstructor
    public static class ResizeImageResult {
        private InputStream is;
        private long size;
    }
}
