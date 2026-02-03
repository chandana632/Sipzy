package com.example.Sipzy.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "sipzy")
public class CoffeeEntity {
    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
}
