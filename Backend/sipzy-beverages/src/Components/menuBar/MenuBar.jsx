import React, {use, useState} from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const MenuBar = () => {
  const {quantities, token, setToken}  = useContext(StoreContext);
  const [active, setActive] = useState('home');
  const uniqueItems = Object.values(quantities).filter(qty => qty > 0);
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/"><img src={assets.logo} alt="" className="logo me-2" height={42} width={42} /></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={active==="home"?"nav-link fw-bold":"nav-link"} to="/" onClick={()=>setActive("home")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={active==="explore"?"nav-link fw-bold":"nav-link"} to="/explore" onClick={()=>setActive("explore")}>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link className={active==="contact-us"?"nav-link fw-bold" :"nav-link"} to="/contact-us" onClick={()=>{
                setActive("contact-us")
              }}>
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="menubar-right me-3">
            <Link to="/cart">
            <div className="d-inline position-relative">
              <img
                src={assets.cart}
                alt=""
                height={32}
                width={32}
                className="position-relative"
              />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                {uniqueItems.length}
              </span>
            </div>
            </Link>
          </div>
         {
          !token ? <> <div className="d-flex gap-3">
          <button className="btn btn-outline-primary" onClick={()=>navigate("/login")}>Login</button>
          <button className="btn btn-outline-success" onClick={()=>navigate("/register")}>Register</button>
        </div></>
        : 
        <div className="dropdown text-end">
          <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={assets.user} alt="mdo" width="32" height="32" />
          </a>
          <ul className="dropdown-menu text-small" style={{right:'0', left:'unset'}}>
            <li><Link className="dropdown-item cursor-pointer" to="/profile">Profile</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="/login" onClick={logout}>Sign out</Link></li>
          </ul>
        </div>
         }
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
