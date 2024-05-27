import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/ReturnButton.css";

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button-container ms-3">
      <FaArrowLeft className="back-button" onClick={() => navigate(-1)} />
    </div>
  );
};

export default ReturnButton;
