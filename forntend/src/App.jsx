import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/home";
import ClassDetails from "./pages/ClassDetails";
import MyBooking from "./pages/MyBooking";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateClass from "./pages/CreateClasses";
import ManageClasses from "./pages/ManageClasses";
import EditClass from "./pages/EditClasses";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBooking";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

          const data = await response.json()
          console.log("ME DATA:", data);
          console.log("Role:",data.role)
        if (response.ok) {
           setUserRole(data.role)
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, []);


  return (
    <div className="App">
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole}
          userRole={userRole}
        />
            <Routes>
              <Route
              path="/trainer/create-class"
                element={
                 <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecking={isAuthChecking}
                  userRole={userRole}
                   allowedRole="trainer">
              <CreateClass />
                 </ProtectedRoute>
                }
               />
               <Route
                  path="/trainer/manage-classes"
                  element={
                  <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isAuthChecking={isAuthChecking}
                         userRole={userRole}
                   allowedRole="trainer"
                   >
                 <ManageClasses />
              </ProtectedRoute>
                      }/>

               <Route
               path="/trainer/edit-class/:id"
                  element={
               <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecking={isAuthChecking}
                userRole={userRole}
                   allowedRole="trainer">
                   <EditClass />
                 </ProtectedRoute>
                 }/>         
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn}
                            setUserRole={setUserRole} />}
          />

          <Route path="/register" element={<Register 
                            setIsLoggedIn={setIsLoggedIn}
                            setUserRole={setUserRole}/>} />

          <Route path="/" element={<Home />} />

          <Route
            path="/class/:id"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecking={isAuthChecking}
              >
                <ClassDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/My-Booking"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecking={isAuthChecking}
              >
                <MyBooking />
              </ProtectedRoute> } />
                <Route
                path="/admin/users"
                element={
                <ProtectedRoute
                 isLoggedIn={isLoggedIn}
                     isAuthChecking={isAuthChecking}
                 userRole={userRole}
                      allowedRole="admin"
                       >
                     <AdminUsers />
                      </ProtectedRoute> }/>
                 <Route path="/admin/all-bookings" element={<AdminBookings />} />
                      

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;