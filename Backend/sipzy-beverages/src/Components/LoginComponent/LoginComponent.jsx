import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import { loginUser } from '../../Service/AuthService';

const LoginComponent = () => {
  const {setToken} = useContext(StoreContext)
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    // 
    event.preventDefault();
    try{
      console.log(data);
      const response = await loginUser(data);
      console.log(response.status,"response");
      if(response.status === 200){
        console.log("Login successful!", response.data.token);
        setToken(response.data.token);
        console.log("Login token", setToken);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"),"local storage token");
        navigate("/");
      }
      else{
      
        toast.error("Chan Login failed. Please try again.");
      }
    }catch(err){
      toast.error("Login failed. Please try again.");
    }
    // Handle login logic here
  }
  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                name='email' onChange={onChangeHandler} value={data.email}/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password'
                onChange={onChangeHandler} value={data.password}/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase " type="submit">Sign
                  in</button>
                  <button className="btn btn-outline-danger btn-login text-uppercase  mt-2" type="submit">Reset</button>
              </div>
              <hr className="my-4"/>
              <div className="mt-4">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginComponent