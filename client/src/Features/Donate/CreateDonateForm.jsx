import { useState } from "react";
import CreateFoodForm from "./CreateFoodForm";
import CreateMoneyForm from "./CreateMoneyForm";
import useDonateFunction from "./useDonateFunction";
import PropTypes from "prop-types";
import Loader from "../../ui/Loader";

function CreateDonateForm({ organization, closeModal }) {
  const [donateType, setDonateType] = useState("food");
  const { donateFunc, isDonating } = useDonateFunction("Donor");

  function handleClick(thing) {
    setDonateType(thing);
  }
  function onSubmit(data) {
    console.log(data);
    donateFunc(data, {
      onSuccess: closeModal,
      onError: closeModal,
    });
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {isDonating && <Loader type={2} />}
      <div className="flex justify-center">
        <div className="flex justify-center gap-2 rounded-lg p-1 shadow-md">
          <button
            className="rounded-md px-4 py-2 text-sm font-semibold text-stone-600 disabled:bg-red-500 disabled:text-white sm:text-base"
            onClick={() => handleClick("food")}
            disabled={donateType === "food"}
          >
            Food
          </button>
          <button
            className="rounded-md px-4 py-2 text-sm font-semibold text-stone-600 disabled:bg-red-500 disabled:text-white sm:text-base"
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
