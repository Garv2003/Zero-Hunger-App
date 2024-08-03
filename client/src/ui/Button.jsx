import { useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button({
  type,
  children,
  to,
  onClick,
  size = "large",
  purpose,
  disabled,
}) {
  const initial = ` text-center transition-all  duration-100 ease cursor-pointer`;
  const sizes = useMemo(() => {
    return {
      small: ` px-4 py-2 rounded-sm `,
      large: ` px-8 py-3  rounded-lg `,
    };
  }, [size]);
  const types = useMemo(() => {
    return {
      doctor: `${initial} ${sizes[size]} bg-red-500 text-white border-none rounded-none hover:bg-red-600`,
      patient: `${initial} ${sizes[size]}  bg-blue-500 text-white hover:bg-blue-600`,
      cancel: `${initial} ${sizes[size]}  border  text-stone-500 hover:bg-stone-100 `,
    };
  }, []);
  if (purpose)
    return (
      <button
        type={purpose}
        disabled={disabled}
        className={`${types[type]} ${sizes[size]}`}
      >
        {children}
      </button>
    );

  if (to) {
    return (
      <Link to={`${to}`} className={`${types[type]} ${sizes[size]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${types[type]} ${sizes[size]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["doctor", "patient", "cancel"]).isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "large"]),
  purpose: PropTypes.oneOf(["submit", "reset"]),
  disabled: PropTypes.bool,
};

export default Button;
