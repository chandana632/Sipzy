package com.example.Sipzy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {

    @GetMapping("/")
    public String helloWorld(){
        System.out.println("hello world");
        return "chan hello to all";
    }
}
