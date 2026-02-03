package com.example.Sipzy.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoffeeRequest {
    private String name;
    private String description;
    private Double price;
    private String category;
}
