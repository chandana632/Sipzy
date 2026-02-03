package com.example.Sipzy.controller;

import com.example.Sipzy.io.UserRequest;
import com.example.Sipzy.io.UserResponse;
import com.example.Sipzy.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/")
public class UserController {

    private final UserService  userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest userRequest) {
        UserResponse response = userService.registerUser(userRequest);
        return response;
    }
}
