import {React, useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";

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
  const [cities, setcities] = useState([]);
  const [selectedcity,  setSelectedcity] = useState("");
  const [medical_centre, setmedical_centre] = useState([])
  const [searchClicked, setSearchClicked] = useState(false);



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
        setcities(data)

    }catch(error){
        console.log("error in fetching cities" + error);
        return ;
    }
};
    fetch_cities();
  },[selectedState]);

   
    const fetch_centre = async() => {
    try{
        //const response = await fetch( `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedcity}`)
          const response = await fetch(
          `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedcity}`
        );
        const data = await response.json()
        setmedical_centre(data)

    }catch(error){
        console.log("error in fetching centres" + error);
        return ;
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
                 setSelectedcity('');
                 setmedical_centre([]);

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
            value = {selectedcity}
            list="city-list"
            onChange={(e) => setSelectedcity(e.target.value)}
            disabled ={!selectedState}
            style={inputStyle} />
            
                <datalist id="city-list">
                {cities.map((city_ip) => (
                <option key={city_ip}  value={city_ip} />
                ))}
            </datalist>
          </div>

          <button
          id="searchBtn"
          onClick={() => {
    fetch_centre();
    setSearchClicked(true);   
  }}
          disabled = {!selectedState || !selectedcity}
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

        {searchClicked && selectedcity && (
            <h1 style={{marginBottom: "20px"}}>
               {medical_centre.length} medical {medical_centre.length === 1 ? "center" : "centers"} available in {selectedcity}
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
  ) : selectedcity ? (
          <p>No medical centres found for {selectedcity}, {selectedState}.</p>
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
          }}
        >
          Book FREE Center Visit
        </button>
      </div>
    ))
  ) : (
    <p>No medical centres found for {selectedcity}, {selectedState}.</p>
  )
) : (
  <p>Please select state and city to view medical centres.</p>
)}




</div>



 



    </>
    

  );
};

export default Search;
