package com.exportimport.backend.dTo;

import com.exportimport.backend.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private Long userId;
    private String userName;
    private UserRole role;

    public AuthResponse(String token, Long userId, String userName,UserRole role) {
        this.token = token;
        this.userId = userId;
        this.userName = userName;
        this.role=role;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}

