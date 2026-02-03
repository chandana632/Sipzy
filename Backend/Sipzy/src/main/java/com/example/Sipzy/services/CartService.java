package com.example.Sipzy.services;

import com.example.Sipzy.io.CartRequest;
import com.example.Sipzy.io.CartResponse;

public interface CartService {
    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest request);
}
