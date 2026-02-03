import React,{useContext, useState} from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import {toast} from "react-toastify"
const PlaceOrder = () => {
    const {foodList=[], quantities={}, setQuantities} = useContext(StoreContext);

    const [billingDetails, setBillingDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address1: "",
        address2: "",
        country: "India",
        state: "Karnataka",
        zip: ""
    });
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prev => ({ ...prev, [name]: value }));
    };
    const placeOrderHandler = (e) => {
        e.preventDefault();

        const orderData = {
            billingDetails,
            items: cartItems.map(item => ({
                foodId: item.id,
                name: item.name,
                price: item.price,
                quantity: quantities[item.id],
                total: item.price * quantities[item.id]
            })),
            summary: {
                subTotal,
                shipping,
                tax,
                total
            }
        };
        localStorage.setItem("Order Details", orderData);
        toast.success(`Hi ${billingDetails.firstName} ${billingDetails.lastName}, Your Order has been placed successfully`);
    }

       
    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    const subTotal = cartItems.reduce((total, item) => {
        return total + item.price * quantities[item.id];
    }, 0);
    const shipping = subTotal===0 ? 0 : 10;
    const tax = subTotal * 0.1;
    const total = subTotal + shipping + tax;
    return (
        <div className="container my-5">
            <div style={
                {
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                }
            }>
                <img src={assets.logo} height={46} width={46}></img>
            </div>
            <div className="row g-5">

                {/* LEFT SIDE – Billing */}
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>

                    <form onSubmit={placeOrderHandler}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label className="form-label">First name</label>
                                <input name="firstName" type="text" className="form-control" value={billingDetails.firstName} onChange={onChangeHandler} required/>
                            </div>

                            <div className="col-sm-6">
                                <label className="form-label">Last name</label>
                                <input name="lastName" type="text" className="form-control" value={billingDetails.lastName} onChange={onChangeHandler} required/>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                <input name="email" type="email" className="form-control" placeholder="you@example.com" value={billingDetails.email} onChange={onChangeHandler} required/>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <input name="address1" type="text" className="form-control" placeholder="1234 Main St" value={billingDetails.address1} onChange={onChangeHandler} required/>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                                <input name="address2" type="text" className="form-control" placeholder="Apartment or suite" value={billingDetails.address2} onChange={onChangeHandler}/>
                            </div>

                            <div className="col-md-5">
                                <label className="form-label">Country</label>
                                <select className="form-select">
                                    <option>Choose...</option>
                                    <option>India</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">State</label>
                                <select className="form-select">
                                    <option>Choose...</option>
                                    <option>Karnataka</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Zip</label>
                                <input name="zip" type="text" className="form-control" value={billingDetails.zip} onChange={onChangeHandler} required/>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <button disabled={cartItems==0} className="w-100 btn btn-primary btn-lg">
                            Continue to PlaceOrder
                        </button>
                    </form>
                </div>

                {/* RIGHT SIDE – CART */}
                <div className="col-md-5 col-lg-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span>Your cart</span>
                        <span className="badge bg-secondary rounded-pill">{cartItems.length}</span>
                    </h4>

                    <ul className="list-group mb-3">
                      {cartItems.map(item=>(
                          <li className="list-group-item d-flex justify-content-between">
                          <div>
                              <h6 className="my-0">{item.name}</h6>
                              <small className="text-muted">Qty:{quantities[item.id]}</small>
                          </div>
                          <span>&#8377;{item.price* quantities[item.id]}</span>
                      </li>
                      ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <strong>Total (INR)</strong>
                            <strong>&#8377;{total}</strong>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default PlaceOrder;
