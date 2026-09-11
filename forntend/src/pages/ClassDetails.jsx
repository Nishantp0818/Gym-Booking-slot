import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const ClassDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const navigate = useNavigate();

    const handleBooking = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/book",
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

    const data = await response.json();

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
          `http://localhost:3000/api/auth/get/${id}`,
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
    <div>
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