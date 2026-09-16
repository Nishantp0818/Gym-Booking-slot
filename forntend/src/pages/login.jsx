import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = ({setIsLoggedIn, setUserRole}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // API And Handle Submit Function
  const handleSubmit = async(e) => {
     try{
    e.preventDefault();
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
      const data = await response.json();
   
    if(response.ok){
      
   console.log("LOGIN ROLE:", data.role);
      console.log(data.message);
      setIsLoggedIn(true)
      setUserRole(data.role)
      navigate("/");
    }else{
      console.log(data.message);
    }
  }catch(error){
    console.error("Error while getting loggin:", error);
  }
  }

  

  return (
    <form className="login-container" onSubmit={handleSubmit}>  
        <h1>Login</h1>      
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit" >Login</button>
        
         Don't have an account? <Link to="/register"> Register</Link  >
    </form>
  );
}
export default Login;