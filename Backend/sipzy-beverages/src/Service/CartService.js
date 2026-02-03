import axios from "axios";

const API_URL = "http://localhost:8080/cart";

export const addToCart = async (foodId, token) =>{
    try{
        await axios.post(API_URL,{foodId}, {headers:{"Authorization": `Bearer ${token}`}}); 
    }catch(err){
        console.error("Error While adding the cart data",err);
    }
}

export const removeQtyFromCart = async (foodId, token) =>{
    try{
        await axios.post(`${API_URL}/remove`, {foodId},
            {headers:{"Authorization": `Bearer ${token}`}});
        
    }catch(err){
        console.error("Error While removing qty from cart",err);

    }
}

export const getCartData = async (token) =>{
    try{
        const response = await axios.get(API_URL,
            {headers:{"Authorization": `Bearer ${token}`}}
        )
            return response.data.items;
    }catch(err){
        console.error("Error While fetching the data",err);
    }
}