import { RxCross2 } from "react-icons/rx";
import { Link, Outlet } from "react-router-dom";
import propTypes from "prop-types";

function MessageBox({ currChat, setCurrChat }) {
  return (
    <div className="h-full w-full p-4">
      {!currChat ? (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="rounded-lg border p-4">
            Welcome! Pick a user to initiate a chat : )
          </h1>
        </div>
      ) : (
        <div className="grid h-full w-full grid-rows-[auto_1fr] gap-2">
          <div className="flex h-fit w-full items-center justify-between border-b bg-white p-2">
            <p className="text-sm font-medium sm:text-base">{currChat?.name}</p>
            <Link to="/app/messages" onClick={() => setCurrChat(null)}>
              <RxCross2 />
            </Link>
          </div>

          <Outlet />
        </div>
      )}
    </div>
  );
}

MessageBox.propTypes = {
  currChat: propTypes.object,
  setCurrChat: propTypes.func,
};

export default MessageBox;
