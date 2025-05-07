package com.exportimport.backend.controller;

import com.exportimport.backend.dto.UserRequest;
import com.exportimport.backend.dto.UserResponse;
import com.exportimport.backend.security.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse createUser(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/get")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }
}
