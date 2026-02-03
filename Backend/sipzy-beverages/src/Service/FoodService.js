import axios from "axios";

const API_URL= "http://localhost:8080/coffee";

 export const fetchFood = async () =>{
        try{
            const response = await axios.get(API_URL);
            return response.data;
        }catch(error){
            throw error;
        }     
}

export const fetchfoodById = async (id) =>{
    try{
        const response = await axios.get(`${API_URL}/${id}`);
          if(response.status===200){
            return response.data;
        }
        else{
            throw(error);
        }
    }catch(error){
        throw(error);
    }
}