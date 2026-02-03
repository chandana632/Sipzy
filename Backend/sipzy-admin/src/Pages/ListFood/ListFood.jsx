import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import  './ListFood.css';
import { deleteFood, getFoodList } from '../../Services/CoffeeService';

const ListFood = () => {
  const [foodList, setFoodList] = useState([]);
  const getFood =async () =>{
    try{
      const response = await getFoodList();
      setFoodList(response);
    }catch(error){
      toast.error("Error While Loading...")

    }
  }

  const handleDelete = async (foodId) => {
    try{
      const response = await deleteFood(foodId);     
      if(response)
        {
          toast.success("Food Removed Successfully!!");
          await getFood();
        } 
        else{
          toast.error("Error While Deleting Food...")

        }
    }catch(error){
      toast.error("Error While Deleting Food...")
    }
  }

  useEffect(()=>{
    getFood();
  },[])
  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {
              foodList.map((item, index)=>{
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.imageUrl} alt="" height={48} width={48} />
                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.category}
                    </td>
                    <td>
                      &#8377;{item.price}
                    </td>
                    <td className="text-danger">
                      <i className="bi bi-x-circle-fill" onClick={()=>handleDelete(item.id)}></i>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListFood