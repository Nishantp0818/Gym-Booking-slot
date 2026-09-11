import Login from "./pages/login";
import "./App.css";
import Register from "./pages/register";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import ClassDetails from "./pages/ClassDetails";
import MyBooking from "./pages/MyBooking";
import { useState } from "react";


function App() {

  const [isLoggedIn , setIsLoggedIn]= useState ("false")
  return (
    <div className="App">
      <Router>
        <Navbar 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route path="/login" element={<Login 
                                            
            setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/class/:id" element={<ClassDetails/>}/>
          <Route path="/My-Booking" element={<MyBooking/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;