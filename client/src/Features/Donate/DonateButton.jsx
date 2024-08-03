import PropTypes from "prop-types";
import { BiDonateHeart } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthProvider";

function DonateButton({ onClick }) {
  const { user } = useAuthContext();
  return user.user.type === "Donor" ? (
    <button
      className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white shadow-lg transition-all duration-100 hover:bg-red-600"
      onClick={onClick}
    >
      <BiDonateHeart />
      Donate
    </button>
  ) : null;
}

// DonateButton.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

export default DonateButton;
