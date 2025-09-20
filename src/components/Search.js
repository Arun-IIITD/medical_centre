import {React, useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";
import Booking from "./Booking"

const Search = () => {
  const boxStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    border: "1px solid black",
    borderRadius: "4px",
    padding: "5px 10px",
    gap: "5px",
    width: "150px",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    width: "100%",
    color: "#495057",
  };

  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity,  setSelectedCity] = useState("");
  const [medical_centre, setMedical_centre] = useState([])
  const [searchClicked, setSearchClicked] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [activeHospital, setActiveHospital] = useState(null);




  useEffect(() => {
  const fetch_states = async() => {
    try{
        const response = await fetch("https://meddata-backend.onrender.com/states")
        const data = await response.json()
        setStates(data)

    }catch(error){
        console.log("error in fetching states" + error);
        return ;
    }
};
    fetch_states();
  },[]);

    useEffect(() => {
    if (!selectedState) return;
    const fetch_cities = async() => {
    try{
        const response = await fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        const data = await response.json()
        setCities(data)

    }catch(error){
        console.log("error in fetching cities" + error);
        return ;
    }
};
    fetch_cities();
  },[selectedState]);

   
    const getHospitals = async() => {
    try{
        //const response = await fetch( `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`)
          const response = await fetch(
          `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
        );
        const data = await response.json()
        setMedical_centre(data);
         setSearchClicked(true);
    }catch(error){
        console.log("error in fetching centres" + error);
        setMedical_centre([]);
    setSearchClicked(false);
    }
};
    




  return (
    <>

    <div style={{ display: "flex", gap: "20px", marginLeft: "100px" }}>

       <div id = "state" style={boxStyle}>
            <FaSearch style={{ color: "#6c757d" }} />
            <input 
            type="text" 
            placeholder="State" 
            value = {selectedState}
            onChange={(e) => {
                 setSelectedState(e.target.value);
                 setSelectedCity('');
                 setMedical_centre([]);
                 setSearchClicked(false);
            }}
               
            list="state-list"
            style={inputStyle}
            />

            <datalist id="state-list">
                {states.map((state_ip) => (
                <option  value={state_ip} />
                ))}
            </datalist>
        </div>

        <div id = "city" style={boxStyle}>
            <FaSearch style={{ color: "#6c757d" }} />
            <input 
            type="text" 
            placeholder="City" 
            value = {selectedCity}
            list="city-list"
            onChange={(e) => {
                setSelectedCity(e.target.value);
                setMedical_centre([]);
                setSearchClicked(false); 
              }}
            disabled ={!selectedState}
            style={inputStyle} />
            
                <datalist id="city-list">
                {cities.map((city_ip) => (
                <option key={city_ip}  value={city_ip} />
                ))}
            </datalist>
          </div>

          <button
          id="#searchBtn"
          onClick={() => {
            getHospitals();
            setSearchClicked(true);   
          }}
          disabled = {!selectedState || !selectedCity}
          style={{
            padding: "5px 15px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>



       </div>

       {/*  HEADING FRO MEDICAL CENTRES  */}

       <div style={{ marginLeft: "100px", marginTop: "20px" }}>

        {searchClicked && selectedCity && (
            <h1 style={{marginBottom: "20px"}}>
              {/* '2 medical centers available in dothan */}
               {medical_centre.length} medical {medical_centre.length === 1 ? "center" : "centers"} available in {selectedCity}
              </h1>
        )}

{/* 
  {searchClicked ? (
  {medical_centre.length > 0 ? (

    medical_centre.map((center, index) => (
      <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
        <h3>{center["Hospital Name"]}</h3>
        <p>{center.Address}</p>
        <p>{center.City}</p>
        <p>{center["Phone Number"]}</p>

          <button
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Book FREE Center Visit
              </button>

      </div>
    ))
  ) : selectedCity ? (
          <p>No medical centres found for {selectedCity}, {selectedState}.</p>
        ) : (
          <p>Please select state and city to view medical centres.</p>
        )}

      )} */}

      {searchClicked ? (
  medical_centre.length > 0 ? (
    medical_centre.map((center, index) => (
      <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
        <h3>{center["Hospital Name"]}</h3>
        <p>{center.Address}</p>
        <p>{center.City}</p>
        <p>{center["Phone Number"]}</p>

        <button
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            // onChange: {Booking}
          }}
          //onClick={setShowBooking(true)}
          onClick={() => setActiveHospital(center)}

        >
          Book FREE Center Visit
        </button>

         {activeHospital &&
            activeHospital["Hospital Name"] === center["Hospital Name"] && (
      <Booking hospital={center} />
  )}


      </div>
    ))
  ) : (
    <p>No medical centres found for {selectedCity}, {selectedState}.</p>
  )
) : (
  <p>Please select state and city to view medical centres.</p>
)}




</div>
</>
  );
};

export default Search;
