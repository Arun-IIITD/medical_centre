import {React, useState} from "react";

const Booking = ({hospital}) => {
    const [selectedDate, setSelectedDate] = useState("Today");
    const [selectedTime, setSelectedTime] = useState("");
     const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );

    const availableDates = ["Today","Tomorrow", "Day after tomorrow"]

    const slots = {
        Morning: ["9:30 AM", "11:00 AM"],
        Afternoon: ["12:30 PM", "1:00 PM", "2:30 PM"],
        Evening: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"],
    };

     const handleBooking = (time) => {
    const newBooking = {
      "Hospital Name": hospital["Hospital Name"],
      City: hospital.City,
      State: hospital.State,
      "Hospital Type": hospital["Hospital Type"],
      "Hospital overall rating": hospital["Hospital overall rating"],
      bookingDate: selectedDate,
      bookingTime: time,
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setSelectedTime(time);
    alert("Appointment booked successfully!");
  };



    return (
        <>
        {/* DATE SELECTION */}

         <div style={{ display: "flex", gap: "15px", margin: "15px 0" }}>
        {availableDates.map((date) => (
          <p
            key={date}
            style={{
              cursor: "pointer",
              fontWeight: selectedDate === date ? "bold" : "normal",
            }}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </p>
        ))}
      </div>

        {/* SLOTS */}
         {Object.keys(slots).map((period) => (
        <div key={period} style={{ marginBottom: "10px" }}>
          <p style={{ fontWeight: "bold" }}>{period}</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {slots[period].map((time) => (
              <button
                key={time}
                onClick={() => handleBooking(time)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  border: "1px solid #007bff",
                  backgroundColor: selectedTime === time ? "#007bff" : "#fff",
                  color: selectedTime === time ? "#fff" : "#007bff",
                  cursor: "pointer",
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}

           

        </>
    )

}

export default Booking;