import { useNavigate } from "react-router-dom";

const ClassCard = ({ item }) => {

    const navigate = useNavigate();
  return (
    <div>
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Description: {item.description}</p>
       <img src={item.image} alt={item.name}/>
       <p>Date: {new Date(item.date).toLocaleDateString("en-IN", {
           day: "2-digit",
           month: "short",
           year: "numeric"})}</p>
     
      <p>Time: {item.time}</p>
      <p>Total Slots: {item.totalSlots}</p>
      <p>Available Slots: {item.availableSlots}</p>
      <button type="button" onClick={()=>{navigate(`/class/${item._id}`)}}> View Details </button>
    </div>
  );
};

export default ClassCard;