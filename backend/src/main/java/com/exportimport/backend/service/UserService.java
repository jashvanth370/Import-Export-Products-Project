package com.exportimport.backend.service;

import com.exportimport.backend.DTO.Response;
import com.exportimport.backend.DTO.UserRequest;
import com.exportimport.backend.DTO.UserResponse;
import com.exportimport.backend.entity.Product;
import com.exportimport.backend.entity.User;
import com.exportimport.backend.entity.UserRole;
import com.exportimport.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private  UserRepository userRepo;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public Response<?> createUser(UserRequest request) {
        try{
            Optional<User> existingUser = userRepo.findByEmail(request.getEmail());
            if(existingUser.isPresent()){
                return new Response<>(400,"Email already exist",null);
            }
            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(encoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build();
            userRepo.save(user);
            return new Response<>(200,"User Registered Successfully",null);
        }
        catch (Exception e){
            return new Response<>(500,"Internal Server Error",null);
        }
    }

    public Response<?> updateUser(Long id, UserRequest userRequest){
        try{
            Optional<User> existingUser = userRepo.findById(id);
            if(existingUser.isEmpty()){
                return new Response<>(400,"File not found",null);
            }
            User user = existingUser.get();
            if(user.getEmail() != userRequest.getEmail() && userRequest.getEmail() != null){
                Optional<User> existingEmail = userRepo.findByEmail(userRequest.getEmail());
                if(existingEmail.isPresent()){
                    return new Response<>(400,"Email already exist",null);
                }
                else{
                    user.setEmail(userRequest.getEmail());
                }
                user.setName(userRequest.getName());
                user.setRole(userRequest.getRole());
                userRepo.save(user);
            }
            return new Response<>(200,"User Updated successfully",null);

        }
        catch (Exception e){
            return new Response<>(500,"Internal Server error",null);
        }
    }

    public Response<?> getAllUsers() {
        List<UserResponse> userResponseList = new ArrayList<>();
        userResponseList =  userRepo.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return new Response<>(200,"All users fetched successfully",userResponseList);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole().name()))
        );
    }

    public Response<?> deleteUser(Long id) {
        try{
            Optional<User> existingUser = userRepo.findById(id);
            if(existingUser.isEmpty()){
                return new Response<>(400,"User not found",null);
            }
            userRepo.deleteById(id);

            return new Response<>(200,"Delete successfully",null);
        }
        catch(Exception e){
            return new Response<>(500,"Internal Server Error",null);
        }
    }


    public UserRole getUserRole(){
        User user = new User();
        return user.getRole();
    }
}
