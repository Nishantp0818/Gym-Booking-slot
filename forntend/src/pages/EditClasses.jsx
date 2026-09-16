import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditClasses.css"

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    date: "",
    time: "",
    totalSlots: "",
  });

  const [loading, setLoading] = useState(true);

  // Get existing class
  useEffect(() => {
    const getClass = async () => {
      try {
        const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/auth/get/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("Class data:", data);

        if (response.ok) {
          const item = data.singleClass;

          setFormData({
            name: item.name,
            category: item.category,
            description: item.description,
            image: item.image,
            date: item.date
              ? new Date(item.date).toISOString().split("T")[0]
              : "",
            time: item.time,
            totalSlots: item.totalSlots,
          });
        } else {
          alert(data.message);
          navigate("/trainer/manage-classes");
        }
      } catch (error) {
        console.error("Error fetching class:", error);
      } finally {
        setLoading(false);
      }
    };

    getClass();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update class
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            totalSlots: Number(formData.totalSlots),
          }),
        }
      );

      const data = await response.json();

      console.log("Update response:", data);

      if (response.ok) {
        alert("Class updated successfully");
        navigate("/trainer/manage-classes");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  if (loading) {
    return <p>Loading class...</p>;
  }

  return (
    <div className="edit-class-container">
      <h1>Edit Class</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalSlots"
          placeholder="Total Slots"
          value={formData.totalSlots}
          onChange={handleChange}
          min="1"
          required
        />

        <button type="submit">
          Update Class
        </button>

        <button
          type="button"
          onClick={() => navigate("/trainer/manage-classes")}
        >
          Cancel
        </button>

      </form>
    </div>
  );
};

export default EditClass;