import propTypes from "prop-types";

function Error({ children, check }) {
  if (check) {
    return (
      <li
        className={`text-xs ${check === "on" ? "text-green-500" : "text-red-500 dark:text-orange-400"} mt-1`}
      >
        <span>
          {check === "on" ? "✅" : "❌"} {children}
        </span>
      </li>
    );
  }
  return (
    <p className="col-[-1/1] mt-1 w-full text-right text-xs text-red-500 dark:text-orange-400">
      {children}
    </p>
  );
}

Error.propTypes = {
  children: propTypes.node.isRequired,
  check: propTypes.oneOfType([propTypes.string, propTypes.bool]),
};

export default Error;
