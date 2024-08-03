import { CgOrganisation } from "react-icons/cg";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoReceipt } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import useDetectClickOutside from "../hooks/useDetectClickOutside";
import { useAuthContext } from "../context/AuthProvider";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";

import propTypes from "prop-types";

const navLinks = [
  { icon: <MdOutlineSpaceDashboard />, label: "Dashboard" },
  { icon: <FaHome />, label: "Home" },
  {
    icon: <CgOrganisation />,
    label: "Organizations",
  },
  {
    icon: <HiChatBubbleBottomCenterText />,
    label: "Messages",
  },
  {
    icon: <IoReceipt />,
    label: "Donations",
  },
];

function Sidebar({ showSidebar, handleSidebar, closeSidebar }) {
  const { ref } = useDetectClickOutside(closeSidebar);
  const { user } = useAuthContext();
  console.log(user);
  return (
    <>
      <div
        className={`row-[1/-1] hidden border-r border-stone-100 bg-stone-50 py-8 lg:block`}
      >
        <div className="mb-6 flex flex-col items-center gap-4">
          <img
            src="/logo.png"
            className="mx-auto w-[80px] rounded-lg object-contain shadow-md"
          />
          <p className="text-lg font-bold text-stone-700">Zero Hunger</p>
        </div>
        <ul className="flex flex-col gap-3 p-4">
          {navLinks.map((link) => {
            if (user.user.type === "Donor" && link.label === "Dashboard") {
              return null;
            }
            return (
              <Link
                to={`${link.label.toLowerCase()}`}
                key={link.label}
                className="linear flex items-center gap-3 rounded-md p-3 transition-all duration-75 hover:bg-stone-100 hover:text-blue-700"
              >
                <span className="text-2xl font-semibold">{link.icon}</span>
                <span className="font-semibold text-stone-500">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      {showSidebar &&
        createPortal(
          <div
            ref={ref}
            className={`linear fixed top-0 z-[1000] h-screen w-[18rem] border-r border-stone-100 bg-stone-50 py-4 transition-all duration-300 lg:hidden ${showSidebar ? "translate-x-0" : "translate-x-[-18rem]"}`}
          >
            <div
              onClick={handleSidebar}
              className="px-4 text-2xl font-bold text-stone-700"
            >
              <AiOutlineMenuFold />
            </div>
            <div className="mb-6 flex flex-col items-center gap-4 py-4">
              <img
                src="/logo.png"
                className="mx-auto w-[80px] rounded-lg object-contain shadow-md"
              />
              <p className="text-lg font-bold text-stone-700">Zero Hunger</p>
            </div>
            <ul className="flex flex-col gap-3 p-4">
              {navLinks.map((link) => {
                if (user.user.type === "Donor" && link.label === "Dashboard") {
                  return null;
                }
                return (
                  <Link
                    to={`${link.label.toLowerCase()}`}
                    key={link.label}
                    className="linear flex items-center gap-3 rounded-md p-3 transition-all duration-75 hover:bg-stone-100 hover:text-blue-700"
                  >
                    <span className="text-2xl font-semibold">{link.icon}</span>
                    <span className="font-semibold text-stone-500">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
}

Sidebar.propTypes = {
  showSidebar: propTypes.bool,
  handleSidebar: propTypes.func,
  closeSidebar: propTypes.func,
};

export default Sidebar;
