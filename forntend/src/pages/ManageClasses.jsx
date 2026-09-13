import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const getClasses = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/get",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Manage Classes:", data);

      if (response.ok) {
        setClasses(data.getClasses);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (response.ok) {
        alert("Class deleted successfully");

        setClasses((prevClasses) =>
          prevClasses.filter((item) => item._id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/trainer/edit-class/${id}`);
  };

  return (
    <div>
      <h1>Manage Classes</h1>

      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        classes.map((item) => (
          <div key={item._id}>
            <img
              src={item.image}
              alt={item.name}
              width="200"
            />

            <h2>{item.name}</h2>

            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Description:</strong> {item.description}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p>
              <strong>Time:</strong> {item.time}
            </p>

            <p>
              <strong>Total Slots:</strong> {item.totalSlots}
            </p>

            <p>
              <strong>Available Slots:</strong> {item.availableSlots}
            </p>

            <button
              type="button"
              onClick={() => handleEdit(item._id)}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ManageClasses;