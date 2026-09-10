import Login from "./pages/login";
import "./App.css";
import Register from "./pages/register";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;