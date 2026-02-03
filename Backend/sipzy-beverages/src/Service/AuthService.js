import axios from "axios";

const API_URL = "http://localhost:8080";

export const registerUser = async (userData) => {
   try{ const response = await axios.post(`${API_URL}/register`, userData);
    return response;}
    catch(err){
        throw err;
    }
}

export const loginUser = async (loginData) => {
    try{
        const response = await axios.post(`${API_URL}/auth/login`, loginData);
        console.log(response,"service response");
        return response;
    }   
    catch(err){
        console.log(err,"service error");
        throw err;
    }   
}