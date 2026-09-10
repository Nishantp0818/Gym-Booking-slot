import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "../components/classCard";

const Home = () => {

  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const getClasses = async () => {

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/get",
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
    <div>

      <h1>Welcome to Gym Slot Booking</h1>

      <h2>Available Classes</h2>

      {classes.map((item) => (

        <ClassCard item={item} key={item._id}>

          <h3>{item.name}</h3>

          <p>Category: {item.category}</p>

          <p>Description: {item.description}</p>
           <img src={item.image} alt={item.name}/>
            
          <p>Date: {item.date}</p>

          <p>Time: {item.time}</p>

          <p>Total Slots: {item.totalSlots}</p>

          <p>Available Slots: {item.availableSlots}</p>

          <hr />

        </ClassCard>

      ))}

    </div>
  );
};

export default Home;