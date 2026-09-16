import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/classCard";
import "./home.css";

const Home = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await 
          fetch(`${import.meta.env.VITE_API_URL}/api/auth/get`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        const data = await response.json();

        console.log("Data:", data);

        if (response.ok) {
          setClasses(data.getClasses);
          console.log(data.message);
        } else {
          navigate("/login");
        }

      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    getClasses();

  }, [navigate]);

  return (
    <div className="home-container">

      <section className="hero-section">
        <h1>Welcome to Gym Slot Booking</h1>
        <p>Book your fitness class and stay consistent with your goals.</p>
      </section>

      <section className="classes-section">
        <h2>Available Classes</h2>

        <div className="classes-grid">
          {classes.map((item) => (
            <ClassCard item={item} key={item._id} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;