import { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/bookings",
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
    <div>
      <h1>All Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table border="1" cellPadding="10">
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
                <td>{booking.user?.name}</td>
                <td>{booking.user?.email}</td>
                <td>{booking.class?.name}</td>
                <td>{booking.class?.category}</td>
                <td>
                  {booking.class?.date
                    ? new Date(booking.class.date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{booking.class?.time}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;