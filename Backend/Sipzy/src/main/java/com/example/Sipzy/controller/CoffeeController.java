package com.example.Sipzy.controller;

import com.example.Sipzy.io.CoffeeRequest;
import com.example.Sipzy.io.CoffeeResponse;
import com.example.Sipzy.services.SipzyInterfaceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.w3c.dom.html.HTMLTableCaptionElement;
import software.amazon.awssdk.thirdparty.jackson.core.JsonProcessingException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RequestMapping("/coffee")
@AllArgsConstructor
@RestController
@CrossOrigin("*")
public class  CoffeeController {

    @Autowired
    private final SipzyInterfaceImpl coffeeService;

    @PostMapping
    public CoffeeResponse addCoffee(@RequestPart("coffee") String coffee, @RequestPart("file") MultipartFile file) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        CoffeeRequest coffeeRequest = null;
        coffeeRequest = mapper.readValue(coffee, CoffeeRequest.class);

        CoffeeResponse coffeeResponse = coffeeService.addCoffee(coffeeRequest, file);
        return coffeeResponse;
    }

    @GetMapping
    public List<CoffeeResponse> getCoffees() {
        return coffeeService.getCoffees();
    }

    @GetMapping("/{id}")
    CoffeeResponse getCoffeeById(@PathVariable String id) {
        return coffeeService.getCoffeeById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    String deleteCoffee(@PathVariable String id) {
       return coffeeService.deleteCoffee(id);
    }
}
