import { useEffect, useState } from "react";
import "./adminbooking.css"

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/auth/bookings`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      console.log("Bookings fetched successfully:", data.bookings);
      setBookings(data.bookings);

    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <h2>Loading bookings...</h2>;
  }

  return (
  <div className="admin-bookings-container">
    <h1>All Bookings</h1>

    {bookings.length === 0 ? (
      <p className="no-bookings">No bookings found</p>
    ) : (
      <div className="bookings-table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Class Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name || "N/A"}</td>

                <td>{booking.user?.email || "N/A"}</td>

                <td>{booking.class?.name || "N/A"}</td>

                <td>{booking.class?.category || "N/A"}</td>

                <td>
                  {booking.class?.date
                    ? new Date(
                        booking.class.date
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>

                <td>{booking.class?.time || "N/A"}</td>

                <td>
                  <span
                    className={`booking-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}
export default AdminBookings;