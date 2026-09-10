import react from "react";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <form className="register-container">
      <h1>Register</h1>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Contact Number" />  
      <input type="password" placeholder="Password" />
      <button type="submit">Register</button>
      Already have an account?<Link to="/login"> Login</Link>
    </form>
  );
}

export default Register;