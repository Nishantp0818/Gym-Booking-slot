import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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
      navigate("/");
    }
  };

  return (
    <nav>
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

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;