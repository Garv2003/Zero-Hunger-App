import { FaEye } from "react-icons/fa";
import Menus from "../../ui/Menus";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useAuthContext } from "../../context/AuthProvider";
function OrganizationRow({ organization, index }) {
  const [showMore, setShowMore] = useState(false);
  const { user } = useAuthContext();
  function handleShowMore() {
    setShowMore((p) => !p);
  }
  return (
    <div
      className={`grid w-full grid-cols-[0.6fr_1.6fr_2.4fr_1.2fr_0.8fr] gap-4 border p-4 text-sm`}
    >
      <div>{index}</div>
      <div className="font-bold">{organization.name}</div>
      <div className="text-stone-500">
        {organization.description ? (
          <div className="flex flex-col">
            <span>
              {showMore
                ? organization.description
                : organization?.description.substring(0, 100) + "..."}
            </span>
            {organization.description.length > 100 && (
              <button
                className="ms-auto font-bold text-blue-500"
                onClick={handleShowMore}
              >
                {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            )}
          </div>
        ) : (
          <div>&mdash;</div>
        )}
      </div>
      <div className="font-medium">{organization.location}</div>
      <div>
        <Menus.Menu>
          <Menus.Toggle opens={organization._id}></Menus.Toggle>
          <Menus.List name={organization._id}>
            <Menus.Button>
              <Link
                to={`${organization._id}`}
                className="flex items-center gap-2"
              >
                <FaEye />
                See Details
              </Link>
            </Menus.Button>

            {user.user.type === "Donor" && (
              <Menus.Button>
                <Link
                  to={`${organization._id}`}
                  className="flex items-center gap-2"
                >
                  <IoChatboxEllipses />
                  Chat
                </Link>
              </Menus.Button>
            )}
          </Menus.List>
        </Menus.Menu>
      </div>
    </div>
  );
}

OrganizationRow.propTypes = {
  organization: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default OrganizationRow;
