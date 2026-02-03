package com.example.Sipzy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SipzyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SipzyApplication.class, args);
	}

    public String helloWorld(){
        return "chan hello to all";
    }
}
