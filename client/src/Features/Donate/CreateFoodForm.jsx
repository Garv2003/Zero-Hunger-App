import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { useAuthContext } from "../../context/AuthProvider";
import propTypes from "prop-types";

function CreateFoodForm({ organization, onSubmit }) {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { org_name: organization.name, email: user.email },
  });

  const handleOnSubmit = (data) => {
    const newDonation = {
      organization: organization,
      donor: {
        email: user.email,
      },
      type: "Food",
      quantity: data.quantity,
      foodType: data.foodType,
      message: data.message || "-",
    };
    onSubmit(newDonation);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="mt-4 flex flex-col gap-2 sm:gap-4"
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
        {errors.email && <Error>{errors.email.message}</Error>}
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
        <label htmlFor="foodType" className="font-semibold text-stone-700">
          Food Type
        </label>
        <select
          id="foodType"
          className="w-full bg-stone-100 p-2 text-sm sm:text-base"
          {...register("foodType", { required: "Food type is required" })}
        >
          <option value="">Select...</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
        {errors.foodType && <Error>{errors.foodType.message}</Error>}
      </div>

      <div className="grid items-center sm:grid-cols-[180px_1fr]">
        <label htmlFor="quantity" className="font-semibold text-stone-700">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          className="w-full bg-stone-100 p-2 text-sm sm:text-base"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 1, message: "Quantity must be at least 1" },
          })}
        />
        {errors.quantity && <Error>{errors.quantity.message}</Error>}
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

CreateFoodForm.propTypes = {
  organization: propTypes.object.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default CreateFoodForm;
