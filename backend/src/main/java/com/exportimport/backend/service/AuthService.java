package com.exportimport.backend.service;

import com.exportimport.backend.DTO.AuthRequest;
import com.exportimport.backend.DTO.AuthResponse;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.repository.UserRepository;
import com.exportimport.backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtil;
    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    public AuthService(
            AuthenticationManager authManager,
            JwtUtils jwtUtil,
            @Qualifier("customUserDetailsService") UserDetailsService userDetailsService,
            UserRepository userRepository
    ) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }


    public AuthResponse login(AuthRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new AuthResponse(token, user.getId(), user.getName(),user.getRole());
    }
}
