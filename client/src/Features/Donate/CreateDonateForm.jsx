import { useState } from "react";
import CreateFoodForm from "./CreateFoodForm";
import CreateMoneyForm from "./CreateMoneyForm";
import useDonateFunction from "./useDonateFunction";
import PropTypes from "prop-types";

function CreateDonateForm({ organization }) {
  const [donateType, setDonateType] = useState("food");
  const { donateFunc, isDonating } = useDonateFunction();

  function handleClick(thing) {
    setDonateType(thing);
  }
  function onSubmit(data) {
    donateFunc(data);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="mb-4 text-center font-mono text-3xl font-medium">
        Donate Form
      </h3>
      <div className="flex justify-center">
        <div className="flex justify-center gap-2 rounded-lg p-1 shadow-md">
          <button
            className="rounded-md px-4 py-2 font-semibold text-stone-600 disabled:bg-red-500 disabled:text-white"
            onClick={() => handleClick("food")}
            disabled={donateType === "food"}
          >
            Food
          </button>
          <button
            className="rounded-md px-4 py-2 font-semibold text-stone-600 disabled:bg-red-500 disabled:text-white"
            onClick={() => handleClick("money")}
            disabled={donateType === "money"}
          >
            Money
          </button>
        </div>
      </div>
      <div>
        {donateType === "food" && (
          <div>
            <CreateFoodForm organization={organization} onSubmit={onSubmit} />
          </div>
        )}
        {donateType === "money" && (
          <div>
            <CreateMoneyForm organization={organization} onSubmit={onSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}

CreateDonateForm.propTypes = {
  organization: PropTypes.object.isRequired,
};

export default CreateDonateForm;
