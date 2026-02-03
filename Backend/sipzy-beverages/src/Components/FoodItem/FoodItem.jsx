import React from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import { useContext } from 'react';
import './FoodItem.css'

const FoodItem = ({name, description, id, imageUrl, price}) => {
  const {quantities={}, increaseQuantity, decreaseQuantity} = useContext(StoreContext);
  return (
    <div  className="col-12 col-sm-6 col-md-4 col-lg-3" style={{border: '1px solid gray', height:'26rem', borderRadius:'8px', width:'15.5rem'}}> 
    <Link to={`/food/${id}`} className="card" style={{ maxWidth: "320px", border:"none" }}>
      <img src={imageUrl} height={250} width={50} className="card-img-top" alt="Product Image" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center mb-2" style={{borderBottom:'1px solid #ddd9d9'}}>
          <span className="h5 mb-0">&#8377;{price}</span>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between bg-light">
        <Link className="btn btn-primary btn-sm" to={`/food/${id}`}>View</Link>
        {quantities[id] > 0 ?
          <div className="d-flex align-items-center gap2">
             <button className="btn btn-danger btn-sm" onClick={()=>decreaseQuantity(id)}>
              <i className='bi bi-dash-circle'></i>
             </button>
              <span className='fw-bold'>{quantities[id]}</span>
              <button className="btn btn-success btn-sm" onClick={()=>increaseQuantity(id)}><i className="bi bi-plus-circle"></i></button>
          </div>
          :(
            <button className="btn btn-primary btn-sm" onClick={()=>increaseQuantity(id)}>
              <i className="bi bi-plus-circle"></i>
            </button>
          )
       }
   </div>
  </div>
  )
}

export default FoodItem