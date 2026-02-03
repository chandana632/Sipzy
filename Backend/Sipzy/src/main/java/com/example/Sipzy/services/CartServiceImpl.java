package com.example.Sipzy.services;

import com.example.Sipzy.entity.CartEntity;
import com.example.Sipzy.io.CartRequest;
import com.example.Sipzy.io.CartResponse;
import com.example.Sipzy.repo.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
        String loggedInUserId = userService.findByUSerId();
       Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
       CartEntity cart = cartOptional.orElseGet(()->new  CartEntity(loggedInUserId, new HashMap<>()));
       Map<String, Integer> cartItems = cart.getItems();
       cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(),0) + 1);
       cart.setItems(cartItems);
       cart= cartRepository.save(cart);
       return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.findByUSerId();
      CartEntity entity =  cartRepository.findByUserId(loggedInUserId).orElse(new CartEntity(null, loggedInUserId, new HashMap<>()));
      return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.findByUSerId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest request) {
        String loggedInUserId = userService.findByUSerId();
        CartEntity cartEntity= cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(()->new RuntimeException());
        Map<String, Integer> cartItems = cartEntity.getItems();
        if(cartItems.containsKey(request.getFoodId())) {
            int currentQty = cartItems.get(request.getFoodId());
            if(currentQty > 0) {
                cartItems.put(request.getFoodId() , currentQty - 1);
            }else{
                cartItems.remove(request.getFoodId());
            }
           cartEntity = cartRepository.save(cartEntity);

        }
        return convertToResponse(cartEntity);
    }

    private CartResponse convertToResponse(CartEntity cartEntity){
      return  CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }
}
