package com.exportimport.backend.DTO;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String name;
    private String email;
    private String phone;
    private String address;
}
