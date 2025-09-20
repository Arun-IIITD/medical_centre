import React from "react";
import logo from "../assests/logo.png"
import header from "../assests/header.png"
import tag_hero from "../assests/tag_hero.png"

const Navbar = () => {
  return (
    <div>
     <img src = {header} alt = "not found" style= {{width: "100vw", height: "30px"}}></img>
      

    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "0px"
      }}
    >
   
      <img src = {logo} alt = "not found" style= {{width: "", height: "30px"}}></img>

      <ul
        style={{
          display: "flex",
          gap: "30px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ cursor: "pointer", color: "#001d3d" }}>Find Doctors</li>
        <li style={{ cursor: "pointer", color: "#001d3d" }}>Hospitals</li>
        <li style={{ cursor: "pointer", color: "#001d3d" }}>Medicines</li>
        <li style={{ cursor: "pointer", color: "#001d3d" }}>Surgeries</li>
        <li style={{ cursor: "pointer", color: "#001d3d" }}>
          Software for Provider
        </li>
        <li style={{ cursor: "pointer", color: "#001d3d" }}>Facilities</li>
      </ul>

      <button
        style={{
          backgroundColor: "#1e90ff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        My Bookings
      </button>
    </nav>

    <img style = {{margin: "20px", width:"100vw", marginTop:"0px"}} src={tag_hero} alt="not_found"></img>

    


    </div>
  );
};

export default Navbar;
