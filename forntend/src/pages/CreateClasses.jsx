import { useState } from "react";
import "./CreateClasses.css"

const CreateClass = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    date: "",
    time: "",
    totalSlots: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/auth/create`,
        {
          method: "POST",
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

      console.log("Create class response:", data);

      if (response.ok) {
        alert("Class created successfully");

        setFormData({
          name: "",
          category: "",
          description: "",
          image: "",
          date: "",
          time: "",
          totalSlots: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error while creating class:", error);
    }
  };

  return (
    <div className="create-class-container">
      <h1>Create Class</h1>

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
          Create Class
        </button>

      </form>
    </div>
  );
};

export default CreateClass;