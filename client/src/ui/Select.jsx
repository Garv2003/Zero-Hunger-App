import propTypes from "prop-types";

function Select({ onChange, options, value, ...props }) {
  return (
    <select
      style={{ borderColor: props.type === "white" ? "#f3f4f6" : "#d1d5db" }}
      className="rounded-sm border bg-white px-2 py-1 text-base font-medium shadow-sm"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.field}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  onChange: propTypes.func.isRequired,
  options: propTypes.array.isRequired,
  value: propTypes.string.isRequired,
  type: propTypes.string,
};

export default Select;
