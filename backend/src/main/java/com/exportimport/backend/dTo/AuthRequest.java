package com.exportimport.backend.dTo;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
