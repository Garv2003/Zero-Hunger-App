import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useAuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { CgProfile } from "react-icons/cg";
function Navbar({ showSidebar, handleSidebar }) {
  const { logoutFunc } = useAuthContext();
  return (
    <div className="w-full border-b border-stone-100 bg-stone-50">
      <nav className="flex h-[60px] w-full items-center justify-between px-4">
        <button
          onClick={handleSidebar}
          className="block px-4 text-2xl font-bold text-stone-700 lg:hidden"
        >
          {showSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
        <div className="flex w-full items-center justify-end gap-4">
          <Link
            to="/app/profile"
            className="text-3xl transition-all duration-100 ease-linear hover:scale-105"
          >
            <CgProfile />
          </Link>

          <button
            className="rounded-md bg-[#000000d8] px-3 py-2 text-sm text-white transition-all duration-100 hover:bg-black"
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
