import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <h3>{booking["Hospital Name"]}</h3>
            <p>
              {booking.City}, {booking.State}
            </p>
            <p>{booking["Hospital Type"]}</p>
            <p>⭐ {booking["Hospital overall rating"]}</p>
            <p>
              <strong>Date:</strong> {booking.bookingDate}
            </p>
            <p>
              <strong>Time:</strong> {booking.bookingTime}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
