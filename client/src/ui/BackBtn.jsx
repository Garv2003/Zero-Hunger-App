import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
function BackBtn() {
  const navigate = useNavigate();
  return (
    <div className="mb-3 text-xl">
      <p onClick={() => navigate("/")}>
        <HiArrowLeft />
      </p>
    </div>
  );
}

export default BackBtn;
