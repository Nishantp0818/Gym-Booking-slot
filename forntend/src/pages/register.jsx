import { Link } from "react-router-dom";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

// API And Handle Submit Function
const handleSubmit = async(e) => {
  e.preventDefault()

  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, contact: contactNumber  , password }),
    credentials: 'include'
  });

  const data = await response.json();
  console.log(data);
  if(response.ok){
    console.log(data.message);
    navigate("/");
  }else{
    console.log(data.message);
  }
};

  return (
    <form className="register-container" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
      <input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} type="text" placeholder="Contact Number" />  
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Register</button>
      Already have an account?<Link to="/login"> Login</Link>
    </form>
  );
}

export default Register;