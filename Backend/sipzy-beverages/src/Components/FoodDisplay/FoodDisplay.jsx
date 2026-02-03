import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category, searchText}) => {
  const { foodList=[], loading } = useContext(StoreContext);

  if (loading) {
    return <h4 className="text-center mt-4">Loading...</h4>;
  }

  const filteredFoods = foodList.filter((food)=>{
    return (category==='All' || food.category===category) && 
    food.name.toLowerCase().includes(searchText.toLowerCase())
  })
  
  useEffect(() => {
    console.log(foodList, "foodlist in fooddisplay")
    console.log(filteredFoods, "filtered food list")
  }, [foodList]);


  return (
    <div className='container'>
      <div className="row" style={{display:'flex', flexWrap:'wrap', gap:'12px'}}>
        {filteredFoods?.length > 0 ?
          (filteredFoods.map((food, index) => (
            <FoodItem key={index} name={food.name} description={food.description} id={food.id} imageUrl={food.imageUrl} price={food.price}></FoodItem>
          )))
          :
          <div className='text-center mt-4'>
            <h4>No Coffees Found</h4>
          </div>
        }
      </div>
    </div>
  )
}

export default FoodDisplay