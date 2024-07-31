import { FaEye } from "react-icons/fa";
import Menus from "../../ui/Menus";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function OrganizationRow({ organization, index }) {
  return (
    <div
      className={`grid w-full grid-cols-[0.6fr_1.6fr_2.4fr_1.2fr_0.8fr] gap-4 border p-4 text-sm`}
    >
      <div>{index}</div>
      <div>{organization.name}</div>
      <div>{organization?.description}</div>
      <div>{organization.location}</div>
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

            <Menus.Button>
              <Link
                to={`${organization._id}`}
                className="flex items-center gap-2"
              >
                <IoChatboxEllipses />
                Chat
              </Link>
            </Menus.Button>
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
