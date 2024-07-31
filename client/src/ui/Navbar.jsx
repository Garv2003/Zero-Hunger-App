import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useAuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

function Navbar({ showSidebar, handleSidebar }) {
  const { logoutFunc } = useAuthContext();
  return (
    <div className="w-full border-b border-stone-100 bg-stone-50">
      <nav className="flex h-[60px] w-full items-center justify-between p-2">
        <button
          onClick={handleSidebar}
          className="block px-4 text-2xl font-bold text-stone-700 lg:hidden"
        >
          {showSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
        <div className="flex w-full items-center justify-end gap-4">
          <Link to="/app/profile">Profile</Link>

          <button
            className="rounded-lg bg-black px-4 py-2 text-white"
            onClick={logoutFunc}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  showSidebar: propTypes.bool,
  handleSidebar: propTypes.func,
};

export default Navbar;
