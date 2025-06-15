package com.exportimport.backend.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final String uploadDir = System.getProperty("user.dir") + "/uploads"; // or hardcoded like "C:/uploads"

    public String saveImage(MultipartFile file) throws IOException {
        // Create directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate a unique file name
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // Save the file to the server
        file.transferTo(filePath.toFile());

        // Return relative or full URL path (adjust this as per your design)
        return "/uploads/" + fileName;
    }

    public Resource loadImageAsResource(String imageUrl) {
        try {
            if (imageUrl == null || imageUrl.isBlank()) {
                throw new IllegalArgumentException("Image path must not be null or empty");
            }
            Path filePath = Paths.get("uploads").resolve(imageUrl).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("Image not found: " + imageUrl);
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not load image: " + imageUrl, e);
        }
    }

}
