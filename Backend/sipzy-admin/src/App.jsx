import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFood from './Pages/AddFood/AddFood'
import ListFood from './Pages/ListFood/ListFood'
import Orders from './Pages/Orders/Orders'
import Sidebar from './Components/Sidebar/Sidebar'
import Menubar from './Components/Menubar/Menubar'
import {ToastContainer} from 'react-toastify'

const App = () => {
    const [sideBarVisible, setSideBarVisible] = useState(true);

    const toggleSideBar = () => {
        setSideBarVisible(!sideBarVisible);
    }
    return (
        <div className="d-flex" id="wrapper">

            <Sidebar sideBarVisible={sideBarVisible} />

            <div id="page-content-wrapper">
                <Menubar toggleSideBar={toggleSideBar} />
                    <ToastContainer/>
                <div className="container-fluid">
                    <Routes>
                        <Route path="/add" element={<AddFood />}></Route>
                        <Route path="/list" element={<ListFood />}></Route>
                        <Route path="/orders" element={<Orders />}></Route>
                        <Route path="/" element={<ListFood />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App