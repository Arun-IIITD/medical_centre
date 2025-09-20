import React, { useState } from "react";

const Booking = ({ hospital }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const handleBook = (time) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({
      hospitalName: hospital["Hospital Name"],
      state: hospital.State,
      city: hospital.City,
      timeOfDay: time,
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));
    alert(`Booked ${hospital["Hospital Name"]} at ${time}`);
  };

  const times = ["Today", "Morning", "Afternoon", "Evening"];

  return (
    <div style={{ marginTop: "10px" }}>
      {times.map((time) => (
        <p
          key={time}
          style={{
            cursor: "pointer",
            padding: "5px",
            border: selectedTime === time ? "1px solid #007bff" : "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block",
            marginRight: "5px",
          }}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </p>
      ))}

      {selectedTime && (
        <button
          onClick={() => handleBook(selectedTime)}
          style={{
            display: "block",
            marginTop: "10px",
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
      )}
    </div>
  );
};

export default Booking;
