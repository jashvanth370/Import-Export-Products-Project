package com.exportimport.backend.controller;


import com.exportimport.backend.DTO.Response;
import com.exportimport.backend.DTO.UserRequest;
import com.exportimport.backend.DTO.UserUpdateDTO;
import com.exportimport.backend.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.GrantedAuthority;





import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public Response<?> createUser(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/get")
    public Response<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/role")
    public ResponseEntity<Map<String, String>> getRole(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String role = "UNKNOWN";
        try {
            if (userDetails.getAuthorities() != null) {
                role = userDetails.getAuthorities().stream()
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("UNKNOWN");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        Map<String, String> response = new HashMap<>();
        response.put("role", role);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-profile/{userId}")
    public Response<?> updateUser(@PathVariable Long userId,
                                  @RequestBody UserUpdateDTO userUpdateDTO){
        return userService.updateUser(userId, userUpdateDTO);
    }

    @GetMapping("/user-profile/{id}")
    public Response<?> getUserProfile(@PathVariable Long id){
        return userService.getProfile(id);
    }

}
