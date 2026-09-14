import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("data:", data);

      if (response.ok) {
        console.log(data.message);

        setIsLoggedIn(false);
        setUserRole("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error while getting logout:", error);
    }
  };

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        GYM BOOKING
      </Link>

      <div className="navbar-links">

        <Link to="/">Home</Link>

        {isLoggedIn === true ? (
          <>
            {/* Member */}
            {userRole === "member" && (
              <Link to="/My-Booking">My Booking</Link>
            )}

            {/* Trainer */}
            {userRole === "trainer" && (
              <>
                <Link to="/trainer/create-class">
                  Create Class
                </Link>

                <Link to="/trainer/manage-classes">
                  Manage Classes
                </Link>
              </>
            )}

            {/* Admin */}
            {userRole === "admin" && (
              <>
                <Link to="/admin/users">
                  Manage Users
                </Link>

                <Link to="/admin/all-bookings">
                  All Bookings
                </Link>
              </>
            )}

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;