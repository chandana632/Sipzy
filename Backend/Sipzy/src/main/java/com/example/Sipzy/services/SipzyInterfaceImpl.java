package com.example.Sipzy.services;

import com.example.Sipzy.entity.CoffeeEntity;
import com.example.Sipzy.io.CoffeeRequest;
import com.example.Sipzy.io.CoffeeResponse;
import com.example.Sipzy.repo.CoffeeRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Service
public class SipzyInterfaceImpl implements  SipzyInterface{

    @Autowired
    private final S3Client s3client;
    @Autowired
    private CoffeeRepo coffeeRepo;

    @Value("${aws.s3.bucketname}")
    private String bucketName;
    @Override
    public String uploadFile(MultipartFile file) {
        String fileNameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key=  UUID.randomUUID().toString() + "." + fileNameExtension;

        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();


            PutObjectResponse response = s3client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
            if(response.sdkHttpResponse().isSuccessful()){
                return "https://"+bucketName+".s3.amazonaws.com/"+key;
            }
            else{
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File Upload Failed");
            }
        }catch(IOException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while uploading the file");
        }
    }

    @Override
    public CoffeeResponse addCoffee(CoffeeRequest request, MultipartFile file) {
        CoffeeEntity coffeeEntity = convertToEntity(request);
        String imageUrl = uploadFile(file);
        coffeeEntity.setImageUrl(imageUrl);
        coffeeEntity = coffeeRepo.save(coffeeEntity);
        return convertToResponse(coffeeEntity);
    }

    @Override
    public List<CoffeeResponse> getCoffees() {
        List<CoffeeEntity> databaseEntries = coffeeRepo.findAll();
        return databaseEntries.stream().map(object->convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public CoffeeResponse getCoffeeById(String id) {
        CoffeeEntity coffee = coffeeRepo.findById(id).orElseThrow(()->new RuntimeException("Id Not Found"));
        return convertToResponse(coffee);
    }

    @Override
    public boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();
        s3client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public String deleteCoffee(String id) {
        CoffeeResponse coffee = getCoffeeById(id);
        String imageURL = coffee.getImageUrl();
        String filename = imageURL.substring(imageURL.lastIndexOf("/")+1);
        boolean deleted = deleteFile(filename);
        if(deleted){
            coffeeRepo.deleteById(id);
        }
        return "Coffee Deleted Successfully";
    }

    public CoffeeEntity convertToEntity(CoffeeRequest coffeeRequest) {
        return CoffeeEntity.builder()
                .name(coffeeRequest.getName())
                .description(coffeeRequest.getDescription())
                .price(coffeeRequest.getPrice())
                .category(coffeeRequest.getCategory())
                .build();
    }

    public CoffeeResponse convertToResponse(CoffeeEntity coffeeEntity) {
        return CoffeeResponse.builder()
                .id(coffeeEntity.getId())
                .name(coffeeEntity.getName())
                .description(coffeeEntity.getDescription())
                .price(coffeeEntity.getPrice())
                .category(coffeeEntity.getCategory())
                .imageUrl(coffeeEntity.getImageUrl())
                .build();
    }
}
