import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./classdetails.css";

const ClassDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const navigate = useNavigate();

    const handleBooking = async () => {
    console.log("1. Booking function started");
  try {
    console.log("2. Sending request");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          classId: id
        })
      }
    );
   
       console.log("3. Response received");
    const data = await response.json();
    console.log("4. JSON received:", data);
    
             
    console.log("Class booked:", data);

    if (response.ok) {
      alert("Class booked successfully!");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Error while booking the class:", error);
  }
};


  useEffect(() => {
    const getClassDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/get/${id}`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        const data = await response.json();

        console.log("Class Details:", data);

        if (response.ok) {
          setClassData(data.singleClass);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    getClassDetails();
  }, [id, navigate]);

  if (!classData) {
    return <h2>Loading...</h2>;
  }

  return (
     <div className="class-details">
      <img src={classData.image} alt={classData.name} />

      <h1>{classData.name}</h1>
      <p>Category: {classData.category}</p>
      <p>Description: {classData.description}</p>
      <p>
        Date:{" "}
        {new Date(classData.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })}
      </p>
      <p>Time: {classData.time}</p>
      <p>Total Slots: {classData.totalSlots}</p>
      <p>Available Slots: {classData.availableSlots}</p>

      <button type="button" onClick={handleBooking}>Book Class</button>
    </div>
  );
};

export default ClassDetails;