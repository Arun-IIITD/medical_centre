import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Booking from "./Booking";

const Search = () => {
  const boxStyle = {
    position: "relative",
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

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [medical_centre, setMedical_centre] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [activeHospital, setActiveHospital] = useState(null);

  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  // Fetch states
  useEffect(() => {
    const fetch_states = async () => {
      try {
        const response = await fetch(
          "https://meddata-backend.onrender.com/states"
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.log("Error fetching states: " + error);
      }
    };
    fetch_states();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!selectedState) return;
    const fetch_cities = async () => {
      try {
        const response = await fetch(
          `https://meddata-backend.onrender.com/cities/${selectedState}`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log("Error fetching cities: " + error);
      }
    };
    fetch_cities();
  }, [selectedState]);

  // Fetch hospitals when search is clicked
  const getHospitals = async () => {
    try {
      const response = await fetch(
        `https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`
      );
      const data = await response.json();
      setMedical_centre(data);
      setSearchClicked(true);
    } catch (error) {
      console.log("Error fetching centres: " + error);
      setMedical_centre([]);
      setSearchClicked(false);
    }
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
              setStateDropdownOpen(true);
            }}
            onFocus={() => setStateDropdownOpen(true)}
            style={inputStyle}
            autoComplete="off"
          />
          {stateDropdownOpen && (
            <ul
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                width: "100%",
                maxHeight: "150px",
                overflowY: "auto",
                listStyle: "none",
                margin: 0,
                padding: 0,
                zIndex: 10,
              }}
            >
              {states
                .filter((s) =>
                  s.toLowerCase().includes(selectedState.toLowerCase())
                )
                .map((state_ip) => (
                  <li
                    key={state_ip}
                    style={{ padding: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedState(state_ip);
                      setStateDropdownOpen(false);
                      setSelectedCity("");
                    }}
                  >
                    {state_ip}
                  </li>
                ))}
            </ul>
          )}
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
              setCityDropdownOpen(true);
            }}
            onFocus={() => setCityDropdownOpen(true)}
            disabled={!selectedState}
            style={inputStyle}
            autoComplete="off"
          />
          {cityDropdownOpen && (
            <ul
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                width: "100%",
                maxHeight: "150px",
                overflowY: "auto",
                listStyle: "none",
                margin: 0,
                padding: 0,
                zIndex: 10,
              }}
            >
              {cities
                .filter((c) =>
                  c.toLowerCase().includes(selectedCity.toLowerCase())
                )
                .map((city_ip) => (
                  <li
                    key={city_ip}
                    style={{ padding: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCity(city_ip);
                      setCityDropdownOpen(false);
                    }}
                  >
                    {city_ip}
                  </li>
                ))}
            </ul>
          )}
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
            {selectedCity.toLowerCase()}
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
