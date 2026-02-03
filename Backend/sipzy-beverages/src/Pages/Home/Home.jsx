import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <main className='container'>
        <Header></Header>
        <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
        <FoodDisplay category={category} searchText={''}></FoodDisplay>
    </main>
  )
}

export default Home