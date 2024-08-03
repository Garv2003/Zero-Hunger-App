import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { useAuthContext } from "../../context/AuthProvider";
import useCreateFeedback from "./useCreateFeedback";
import Loader from "../../ui/Loader";
import propTypes from "prop-types";

const CreateFeedbackForm = ({ organization, closeModal }) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
      org_email: organization.email,
      org_id: organization._id,
    },
  });
  const { createFeedback, isSubmitting } = useCreateFeedback(organization._id);

  const onSubmit = (data) => {
    console.log(data);
    //data includes donor email , organization email , message , rating .
    createFeedback(data, {
      onSuccess: () => closeModal(),
      onError: () => closeModal(),
    });
    // Handle form submission here (e.g., send the data to an API)
  };

  if (isSubmitting) return <Loader type={2} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-4 flex flex-col gap-4">
      <div className="grid grid-cols-[180px_1fr] items-center">
        <label htmlFor="email" className="font-semibold text-stone-700">
          Email
        </label>
        <input
          className="w-full bg-stone-100 p-2 disabled:bg-stone-300"
          id="email"
          type="email"
          {...register("email")}
          disabled
        ></input>
      </div>

      <div className="grid grid-cols-[180px_1fr] items-center">
        <label htmlFor="org_email" className="font-semibold text-stone-700">
          Organization
        </label>
        <input
          className="w-full bg-stone-100 p-2 disabled:bg-stone-300"
          id="org_email"
          type="email"
          {...register("org_email")}
          disabled
        ></input>
      </div>
      <div className="grid grid-cols-[180px_1fr] items-center">
        <label htmlFor="rating" className="font-semibold text-stone-700">
          Rating
        </label>
        <select
          id="rating"
          className="w-full bg-stone-100 p-2"
          {...register("rating", { required: "Rating is required" })}
        >
          <option value="">Select...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.rating && <Error>{errors.rating.message}</Error>}
      </div>

      <div className="grid grid-cols-[180px_1fr] items-center">
        <label htmlFor="message" className="font-semibold text-stone-700">
          Feedback
        </label>
        <textarea
          id="message"
          {...register("message", { required: "Feedback is required" })}
          className="w-full bg-stone-100 p-2"
        />
        {errors.message && <Error>{errors.message.message}</Error>}
      </div>

      <button
        type="submit"
        className="rounded-md border bg-red-500 p-2 font-semibold text-white"
      >
        Submit Feedback
      </button>
    </form>
  );
};

CreateFeedbackForm.propTypes = {
  organization: propTypes.object.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default CreateFeedbackForm;
