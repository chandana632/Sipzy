import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { addFood } from "../../Services/CoffeeService";
import { toast } from "react-toastify";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

 const handleSubmit = async (event) =>{
    event.preventDefault();
    if(!image){
        alert("Please select an image")
        return;
    }
    try{
        await addFood(data, image);
        toast.success("Food Added Successfully");
        setData({name:'', price:'', category:'', description:''});
        setImage(null);
    }catch(error){
        toast.error("Error While Adding Food");
    }
    
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form p-5 shadow-sm bg-white">
              <h2 className="text-center mb-4">Add Food</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="image" className="form-label">
                      <img
                        src={image ? URL.createObjectURL(image) : assets.upload}
                        height={98}
                      ></img>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="File"
                      id="image"
                      required
                      hidden
                      onChange={(e) => setImage(e.target.files[0])}
                    ></input>
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Name"
                      name="name"
                      value={data.name}
                      onChange={onChangeHandler}
                    ></input>
                  </div>
                  <div className="col-12">
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={data.category}
                    >
                      <option value="Hot Coffee">Hot Coffee</option>
                      <option value="Cold Coffee">Cold Coffee</option>
                      <option value="Teas">Teas</option>
                      <option value="Coolers">
                        Coolers
                      </option>
                      <option value="Quick Bites">Quick Bites</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <input
                      type="number"
                      className="form-control custom-input"
                      placeholder="Price"
                      name="price"
                      onChange={onChangeHandler}
                      value={data.price}
                    ></input>
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control custom-input"
                      rows="5"
                      placeholder="Description"
                      name="description"
                      onChange={onChangeHandler}
                      value={data.description}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
