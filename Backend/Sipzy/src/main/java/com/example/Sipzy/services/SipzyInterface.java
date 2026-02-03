package com.example.Sipzy.services;

import com.example.Sipzy.entity.CoffeeEntity;
import com.example.Sipzy.io.CoffeeRequest;
import com.example.Sipzy.io.CoffeeResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SipzyInterface {
    String uploadFile(MultipartFile file);

    CoffeeResponse addCoffee(CoffeeRequest request , MultipartFile file);

    List<CoffeeResponse> getCoffees();

    CoffeeResponse getCoffeeById(String id);

    boolean deleteFile(String filename);

    String deleteCoffee(String id);


}
