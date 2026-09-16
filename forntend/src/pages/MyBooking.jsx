import { useNavigate } from "react-router-dom";
import "./MyBooking.css"
import { useEffect, useState } from "react";

const MyBooking = () => {
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  // Get all bookings
  const getBookings = async () => {
    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/auth/get-bookings`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("data:", data);

      if (response.ok) {
        console.log("Member have simile types of bookings",data)
        setBooking(data.bookings);
        console.log(data.message);
      
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error while getting the booking:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, [navigate]);

  // Cancel booking
  const handleCancel = async (bookingId) => {
    try {
      const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/cancel-booking/${bookingId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("data:", data);

      if (response.ok) {
        console.log(data.message);

        // Get updated bookings after cancellation
        getBookings();
      } else {
        navigate("/My-Booking");
      }
    } catch (error) {
      console.error("Error while cancelling the booking:", error);
    }
  };

  return (
    <div className="my-booking-container">
      <h1>My Bookings</h1>

      {booking.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <div className="booking-list">
          {booking.map((item) => (
            <div className="booking-card" key={item._id}>
              <img
                src={item.class.image}
                alt={item.class.name}
                className="booking-image"
              />

              <div className="booking-info">
                <h2>{item.class.name}</h2>

                <p>
                  <strong>Category:</strong> {item.class.category}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(item.class.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p>
                  <strong>Time:</strong> {item.class.time}
                </p>

                <p>
                  <strong>Booking ID:</strong> {item._id}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      item.status === "Active" ? "active" : "cancelled"
                    }
                  >
                    {item.status}
                  </span>
                </p>

                {item.status === "Active" && (
                  <button
                    type="button"
                    onClick={() => handleCancel(item._id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;