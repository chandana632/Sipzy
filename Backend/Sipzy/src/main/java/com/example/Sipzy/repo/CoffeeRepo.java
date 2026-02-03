package com.example.Sipzy.repo;

import com.example.Sipzy.entity.CoffeeEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoffeeRepo extends MongoRepository<CoffeeEntity, String> {
}
