import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageClasses.css"

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const getClasses = async () => {
    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/auth/get`,
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
       `${import.meta.env.VITE_API_URL}/api/auth/delete/${id}`,
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
  <div className="manage-classes-container">
    <h1>Manage Classes</h1>

    {classes.length === 0 ? (
      <p className="no-classes">No classes found.</p>
    ) : (
      <div className="manage-classes-grid">
        {classes.map((item) => (
          <div className="manage-class-card" key={item._id}>
            <img
              src={item.image}
              alt={item.name}
              className="manage-class-image"
            />

            <div className="manage-class-content">
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

              <div className="slot-info">
                <p>
                  <strong>Total Slots:</strong> {item.totalSlots}
                </p>

                <p>
                  <strong>Available Slots:</strong> {item.availableSlots}
                </p>
              </div>

              <div className="class-actions">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

export default ManageClasses;