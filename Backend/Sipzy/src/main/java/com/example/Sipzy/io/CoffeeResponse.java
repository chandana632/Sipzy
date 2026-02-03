package com.example.Sipzy.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CoffeeResponse {
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
}
