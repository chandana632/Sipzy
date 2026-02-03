package com.example.Sipzy.services;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


public interface AuthenticationFacade {
    Authentication getAuthentication();
}
