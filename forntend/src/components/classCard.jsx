import { useNavigate } from "react-router-dom";
import "./classCard.css"

const ClassCard = ({ item }) => {

  const navigate = useNavigate();

  return (
    <div className="class-card">

      <img
        src={item.image}
        alt={item.name}
        className="class-card-image"
      />

      <div className="class-card-content">

        <h3>{item.name}</h3>

        <p>
          <strong>Category:</strong> {item.category}
        </p>

        <p className="class-description">
          {item.description}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(item.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
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
            <strong>Available:</strong> {item.availableSlots}
          </p>
        </div>

        <button
          type="button"
          className="view-details-btn"
          onClick={() => {
            navigate(`/class/${item._id}`);
          }}
        >
          View Details
        </button>

      </div>
    </div>
  );
};

export default ClassCard;