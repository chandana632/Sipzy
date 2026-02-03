import { Route, Routes } from 'react-router-dom'
import './App.css'
import MenuBar from './Components/menuBar/MenuBar'
import Home from './Pages/Home/Home'
import ContactUs from './Pages/Contact Us/ContactUs'
import ExploreFood from './Pages/Explore Food/ExploreFood'
import Header from './Components/Header/Header'
import FoodDetails from './Pages/FoodDetails/FoodDetails'
import Cart from './Pages/Cart/cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import LoginComponent from './Components/LoginComponent/LoginComponent'
import Register from './Components/Register/Register'
import {ToastContainer} from 'react-toastify';

function App() {
  
  return (
    <div>
      <MenuBar/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/contact-us" element={<ContactUs></ContactUs>}></Route>
        <Route path="/explore" element={<ExploreFood></ExploreFood>}></Route>
        <Route path="/food/:id" element={<FoodDetails></FoodDetails>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/order" element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path="/login" element={<LoginComponent></LoginComponent>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>

      </Routes>
    </div>
  )
}

export default App
