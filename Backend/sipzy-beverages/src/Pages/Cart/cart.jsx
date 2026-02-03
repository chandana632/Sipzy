import React from 'react'
import './cart.css'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

const cart = () => {
    const navigate = useNavigate();
    const {foodList=[],increaseQuantity, decreaseQuantity, quantities={}, removeFromCart} = useContext(StoreContext);

    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    const subTotal = cartItems.reduce((total, item) => {
        return total + item.price * quantities[item.id];
    }, 0);
    const shipping = subTotal===0 ? 0 : 10;
    const tax = subTotal * 0.1;
    const total = subTotal + shipping + tax;

  return (
    <div className="cart-wrapper">
    <div className="container">
        <div className="row g-4">
            <div className="col-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Shopping Cart</h4>
                    <span className="text-muted">3 items</span>
                </div>
                {
                    cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="d-flex flex-column gap-3"> 
                            <div className="product-card p-3 shadow-sm">
                                <div className="row align-items-center">
                                    <div className="col-md-2">
                                        <img src={item.imageUrl} alt={item.name}className="product-image"/>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="mb-1">{item.name}</h6>
                                        <p className="text-muted mb-0">{item.category}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <button className="quantity-btn" onClick={()=>{decreaseQuantity(item.id)}}>-</button>
                                            <input type="number" className="quantity-input" min="1"  value={quantities[item.id]} readOnly/>
                                            <button className="quantity-btn" onClick={()=>{increaseQuantity(item.id)}}>+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <span className="fw-bold">&#8377;{item.price * quantities[item.id]}</span>
                                    </div>
                                    <div className="col-md-1" onClick={()=>removeFromCart(item.id)}>
                                        <i className="bi bi-trash remove-btn"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    )
                    )
                }
                <Link to="/">
                    <button className="btn btn-primary mt-3"><i className="bi bi-arrow-left" style={{marginRight:'4px'}}></i>Continue Shopping</button>
                </Link>
            </div>

            <div className="col-lg-4">
                <div className="summary-card p-4 shadow-sm">
                    <h5 className="mb-4">Order Summary</h5>
                    
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Subtotal</span>
                        <span>&#8377; {subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Shipping</span>
                        <span>&#8377;{subTotal==0?0.0 :shipping}</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between mb-4">
                        <span className="fw-bold">Total</span>
                        <span className="fw-bold">&#8377;{total}</span>
                    </div>

                    <button variant="secondary" disabled={cartItems.length==0} className="btn btn-primary checkout-btn w-100 mb-3" onClick={()=>navigate("/order")}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default cart