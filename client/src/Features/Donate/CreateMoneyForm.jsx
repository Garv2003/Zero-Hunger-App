import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { useAuthContext } from "../../context/AuthProvider";
import propTypes from "prop-types";

function CreateMoneyForm({ organization, onSubmit }) {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { org_name: organization.name, email: user.email },
  });

  const handleOnSubmit = (data) => {
    console.log(data);
    const newDonation = {
      organization: organization,
      type: "Money",
      amount: data.amount,
      donor: {
        _id: user._id,
      },
      message: data.message || "-",
    };
    onSubmit(newDonation);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="mt-4 flex flex-col gap-4"
    >
      <div className="grid items-center sm:grid-cols-[180px_1fr]">
        <label htmlFor="email" className="font-semibold text-stone-700">
          Email
        </label>
        <input
          className="w-full bg-stone-100 p-2 text-sm disabled:bg-stone-300 sm:text-base"
          id="email"
          type="email"
          disabled
          {...register("email")}
        />
      </div>
      <div className="grid items-center sm:grid-cols-[180px_1fr]">
        <label htmlFor="org_name" className="font-semibold text-stone-700">
          Organization
        </label>
        <input
          className="w-full bg-stone-100 p-2 text-sm disabled:bg-stone-300 sm:text-base"
          id="org_name"
          type="text"
          disabled
          {...register("org_name")}
        />
      </div>

      <div className="grid items-center sm:grid-cols-[180px_1fr]">
        <label htmlFor="amount" className="font-semibold text-stone-700">
          Donation Amount
        </label>
        <input
          id="amount"
          type="number"
          className="w-full bg-stone-100 p-2 text-sm sm:text-base"
          {...register("amount", {
            required: "Donation amount is required",
            min: { value: 1, message: "Amount must be at least 1" },
          })}
        />
        {errors.amount && <Error>{errors.amount.message}</Error>}
      </div>

      <div className="grid items-center sm:grid-cols-[180px_1fr]">
        <label htmlFor="message" className="font-semibold text-stone-700">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          className="w-full bg-stone-100 p-2 text-sm sm:text-base"
        />
      </div>

      <button
        type="submit"
        className="rounded-md border bg-red-500 p-2 font-semibold text-white"
      >
        Donate
      </button>
    </form>
  );
}

CreateMoneyForm.propTypes = {
  organization: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default CreateMoneyForm;
