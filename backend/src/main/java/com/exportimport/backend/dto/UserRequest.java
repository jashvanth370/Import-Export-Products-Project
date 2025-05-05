package com.exportimport.backend.dto;

import com.exportimport.backend.model.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private UserRole role;
}

