import { createContext, useEffect, useState } from "react";
import { fetchFood } from "../service/FoodService";
import axios from "axios";
import { addToCart, getCartData, removeQtyFromCart } from "../Service/CartService";
export const StoreContext = createContext();

export const StoreContextProvider = (props)=>{
    const [foodList , setFoodList] = useState([]);
    const [quantities , setQuantities] = useState({});  
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    const increaseQuantity = async (foodId)=>{
        setQuantities((prev)=>({
            ...prev,
            [foodId] : (prev[foodId] || 0) + 1
        }));
        await addToCart(foodId, token);
     
    }

    const decreaseQuantity = async (foodId)=>{
        setQuantities((prev)=>({
            ...prev,
            [foodId] : prev[foodId] > 0 ? prev[foodId] - 1 : 0
        }));
        await removeQtyFromCart(foodId, token)
       
    }

    const removeFromCart = (foodId) => {
        setQuantities((prev) => {
            const updatedQuantities = { ...prev };
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });
    }

    const localCartData = async (token) =>{
        const items = await getCartData(token);
        if(items==null)return;
        setQuantities(items);
    }

    useEffect(() => {
      async function loadData() {
        const response = await fetchFood();
        setFoodList(response);
        setLoading(false);
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem('token'));
           await localCartData(localStorage.getItem("token"));
            localCartData(token);
        }
      }
      loadData();
    }, []);

    const contextValue = {
        loading,
        foodList,
        quantities,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        token,
        setToken,
    }
 
   
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}