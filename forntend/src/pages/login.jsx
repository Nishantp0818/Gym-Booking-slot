import react from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="login-container">
        <h1>Login</h1>      
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
         Don't have an account? <Link to="/register"> Register</Link  >
    </form>
  );
}

export default Login;