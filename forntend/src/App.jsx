import Login from "./pages/login";
import "./App.css";
import Register from "./pages/register";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import ClassDetails from "./pages/ClassDetails";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/class/:id" element={<ClassDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;