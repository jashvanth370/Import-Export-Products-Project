package com.exportimport.backend.DTO;

import com.exportimport.backend.entity.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
    private String token;
    private Long userId;
    private String userName;
    private UserRole role;
    private int statusCode;
    private String message;

    public AuthResponse(String token, Long userId, String userName,UserRole role) {
        this.token = token;
        this.userId = userId;
        this.userName = userName;
        this.role=role;
    }

}

