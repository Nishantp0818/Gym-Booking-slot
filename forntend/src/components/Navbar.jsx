import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
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
      navigate("/");
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {isLoggedIn === true ? (
        <>
          <Link to="/My-Booking">My Booking</Link>

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