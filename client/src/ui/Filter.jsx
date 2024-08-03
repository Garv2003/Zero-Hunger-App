import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    setSearchParams({ [filterField]: value });
  }

  return (
    <div className="flex w-fit gap-1 rounded-lg border bg-white p-1 shadow-sm">
      {options.map((option) => {
        return (
          <button
            className={`rounded-md border-none px-2 py-1 text-base font-medium transition-all duration-75 hover:text-white ${currentFilter === option.value ? "bg-blue-600 text-white" : "bg-white"} hover:bg-blue-600`}
            key={option.value}
            onClick={() => handleClick(option.value)}
            active={currentFilter === option.value ? "true" : "false"}
          >
            {option.field}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
