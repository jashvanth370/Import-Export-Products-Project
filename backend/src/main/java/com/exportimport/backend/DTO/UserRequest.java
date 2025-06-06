package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private UserRole role;
    private String phone;
    private String address;
}

