import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Booking from "./Booking";

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

  const [states, setStates] = useState(["Alabama", "Texas", "California"]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [medical_centre, setMedical_centre] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [activeHospital, setActiveHospital] = useState(null);

  // Fetch cities dynamically based on selected state
  useEffect(() => {
    if (!selectedState) return;
    const cityMap = {
      Alabama: ["Dothan", "Birmingham"],
      Texas: ["Houston", "Dallas"],
      California: ["Los Angeles", "San Francisco"],
    };
    setCities(cityMap[selectedState] || []);
  }, [selectedState]);

  // Mock hospital data dynamically for any state/city
  const getHospitals = () => {
    const data = [
      {
        "Hospital Name": selectedState, // hospital name = state
        Address: "123 Main St",
        City: selectedCity,
        State: selectedState,
        "Phone Number": "1234567890",
      },
      {
        "Hospital Name": `${selectedState} Central Hospital`,
        Address: "456 Elm St",
        City: selectedCity,
        State: selectedState,
        "Phone Number": "9876543210",
      },
    ];
    setMedical_centre(data);
    setSearchClicked(true);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginLeft: "100px" }}>
        {/* State input */}
        <div id="state" style={boxStyle}>
          <FaSearch style={{ color: "#6c757d" }} />
          <input
            type="text"
            placeholder="State"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
              setMedical_centre([]);
              setSearchClicked(false);
            }}
            list="state-list"
            style={inputStyle}
          />
          <datalist id="state-list">
            {states.map((state_ip) => (
              <option key={state_ip} value={state_ip} />
            ))}
          </datalist>
        </div>

        {/* City input */}
        <div id="city" style={boxStyle}>
          <FaSearch style={{ color: "#6c757d" }} />
          <input
            type="text"
            placeholder="City"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setMedical_centre([]);
              setSearchClicked(false);
            }}
            list="city-list"
            disabled={!selectedState}
            style={inputStyle}
          />
          <datalist id="city-list">
            {cities.map((city_ip) => (
              <option key={city_ip} value={city_ip} />
            ))}
          </datalist>
        </div>

        {/* Search button */}
        <button
          id="searchBtn"
          onClick={getHospitals}
          disabled={!selectedState || !selectedCity}
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

      {/* Heading for medical centres */}
      <div style={{ marginLeft: "100px", marginTop: "20px" }}>
        {searchClicked && selectedCity && (
          <h1 style={{ marginBottom: "20px" }}>
            {medical_centre.length} medical{" "}
            {medical_centre.length === 1 ? "center" : "centers"} available in{" "}
            {selectedCity}
          </h1>
        )}

        {/* List of hospitals */}
        {searchClicked ? (
          medical_centre.length > 0 ? (
            <ul>
              {medical_centre.map((center, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
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
                    onClick={() => setActiveHospital(center)}
                  >
                    Book FREE Center Visit
                  </button>

                  {activeHospital &&
                    activeHospital["Hospital Name"] ===
                      center["Hospital Name"] && (
                      <Booking hospital={center} />
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No medical centres found for {selectedCity}, {selectedState}.
            </p>
          )
        ) : (
          <p>Please select state and city to view medical centres.</p>
        )}
      </div>
    </>
  );
};

export default Search;
