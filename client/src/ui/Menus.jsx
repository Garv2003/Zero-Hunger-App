import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import useDetectClickOutside from "../hooks/useDetectClickOutside";
import { createPortal } from "react-dom";
import propTypes from "prop-types";

const menuContext = createContext();

function Menus({ children }) {
  const [openMenu, setOpenMenu] = useState("");
  const [position, setPosition] = useState(null);

  const open = setOpenMenu;
  const close = () => setOpenMenu("");

  return (
    <menuContext.Provider
      value={{ openMenu, open, close, position, setPosition }}
    >
      {children}
    </menuContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ opens }) {
  const { open, openMenu, close, setPosition } = useContext(menuContext);

  function handleClick(e) {
    e.stopPropagation();
    // what we did is we stopped this click event to move further up the dom tree
    // console.log("click");
    opens === "" || opens !== openMenu ? open(opens) : close();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }

  return (
    <button
      className="hover:color-stone-700 mx-auto translate-x-[0.8rem] rounded-sm border-none bg-none p-[0.4rem] text-lg font-bold transition-all duration-200 hover:bg-stone-100"
      onClick={handleClick}
    >
      <HiEllipsisVertical />
    </button>
  );
}

function List({ children, name }) {
  const { openMenu, close, position } = useContext(menuContext);
  const { ref } = useDetectClickOutside(() => {
    console.log("outside click");
    close();
  }, false); // bubbling phase as by default,  we made it to capture events in the capturing phase hence outside click was getting detected whenever we click anywhere
  if (name !== openMenu) return null;

  const x = position.x + "px";
  const y = position.y + "px";

  return createPortal(
    <ul
      ref={ref}
      style={{ top: y, right: x }}
      className={`fixed z-[1000] flex flex-col gap-2 rounded-md bg-stone-50 px-3 py-2 shadow-md`}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, onClick, disabled }) {
  const { close } = useContext(menuContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <button
        className="flex w-full items-center gap-1 gap-2 border-none bg-none p-1 text-left text-xs font-normal transition-all duration-200 hover:bg-stone-200 hover:text-stone-700"
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

Menus.propTypes = {
  children: propTypes.node.isRequired,
};

Menu.propTypes = {
  children: propTypes.node.isRequired,
};

Toggle.propTypes = {
  opens: propTypes.string.isRequired,
};

List.propTypes = {
  children: propTypes.node.isRequired,
  name: propTypes.string.isRequired,
};

Button.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
};

export default Menus;
