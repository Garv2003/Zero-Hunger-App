import propTypes from "prop-types";

function Table({ purpose, headers, data, render }) {
  return (
    <ul className="w-full">
      <li
        className={`grid w-full ${purpose === "donations" ? "grid-cols-[0.8fr_1fr_2fr_1fr_0.8fr]" : "grid-cols-[0.6fr_1.6fr_2.4fr_1.2fr_0.8fr]"} gap-4 border bg-blue-500 p-4 font-mono text-sm font-bold`}
      >
        {headers.map((header) => (
          <div key={header}>{header}</div>
        ))}
      </li>
      <>{data.map(render)}</>
    </ul>
  );
}

Table.propTypes = {
  purpose: propTypes.string.isRequired,
  headers: propTypes.arrayOf(propTypes.string).isRequired,
  data: propTypes.array.isRequired,
  render: propTypes.func.isRequired,
};

export default Table;
