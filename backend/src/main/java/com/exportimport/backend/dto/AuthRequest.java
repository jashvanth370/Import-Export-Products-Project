package com.exportimport.backend.dto;

import com.exportimport.backend.model.UserRole;
import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
