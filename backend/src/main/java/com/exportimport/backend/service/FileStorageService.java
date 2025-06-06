package com.exportimport.backend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
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
}
