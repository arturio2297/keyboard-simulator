package com.backend.service.image;

import com.backend.core.util.FileUtil;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;

public class ImageFile implements MultipartFile {
    private final String filename;
    private final String contentType;
    private final ByteArrayInputStream is;
    private final byte[] bytes;
    private final long size;

    public ImageFile(BufferedImage image, String filename) throws IOException {
        this.filename = filename;
        this.contentType = FileUtil.getContentType(filename);
        final ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(image, FileUtil.getExtension(filename), os);
        final byte[] bytes = os.toByteArray();
        this.bytes = bytes;
        this.size = os.size();
        this.is = new ByteArrayInputStream(bytes);
    }

    @Override
    public String getName() {
        return filename;
    }

    @Override
    public String getOriginalFilename() {
        return filename;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return is == null || getSize() == 0;
    }

    @Override
    public long getSize() {
        return size;
    }

    @Override
    public byte[] getBytes() {
        return bytes;
    }

    @Override
    public InputStream getInputStream() {
        return is;
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        Files.write(dest.toPath(), getBytes());
    }
}
