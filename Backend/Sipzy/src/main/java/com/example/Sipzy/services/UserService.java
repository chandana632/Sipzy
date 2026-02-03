package com.example.Sipzy.services;

import com.example.Sipzy.io.UserRequest;
import com.example.Sipzy.io.UserResponse;

public interface UserService {
    UserResponse registerUser(UserRequest request);

    String findByUSerId();
}
