import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import { useAuthContext } from "../../context/AuthProvider";
import axios from "axios";
import propTypes from "prop-types";
import useEditProfile from "../useEditProfile";
import Loader from "../../ui/Loader";

function EditDonorProfileForm({ closeModal }) {
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      userEmail: user.email,
      phone: user.phone,
      location: user.location,
    },
  });

  const { editProfileFunc, isUpdating } = useEditProfile();
  const onSubmit = async (data) => {
    console.log(data);
    const newUser = {
      name: data.name,
      phone: data.phone,
      email: data.userEmail,
      location: data.location,
    };
    editProfileFunc(
      { newUser: newUser, _id: user._id },
      {
        onSuccess: closeModal,
        onError: closeModal,
      },
    );
  };

  return (
    <div className="p-4">
      {isUpdating && <Loader type={2} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-[30rem] flex-col gap-1 p-4"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <div className="my-1 w-full">
            <input
              type="text"
              id="name"
              className="w-full rounded-md bg-stone-100 p-2 text-sm shadow-sm"
              {...register("name", {
                required: "Please enter your name",
              })}
              autoComplete="off"
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="userEmail"
            className="w-[150px] pt-1 text-sm font-medium"
          >
            Email
          </label>
          <div className="my-1">
            <input
              type="email"
              autoComplete="on"
              className="w-full flex-1 rounded-md bg-stone-100 p-2 text-sm shadow-sm disabled:bg-stone-300"
              id="userEmail"
              {...register("userEmail")}
              disabled
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <div className="my-1 w-full">
            <input
              type="tel"
              id="phone"
              className="w-full rounded-md bg-stone-100 p-2 text-sm shadow-sm"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid phone number.",
                },
              })}
              autoComplete="off"
            />
            {errors.phone && <Error>{errors.phone.message}</Error>}
          </div>
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <div className="my-1 w-full">
            <input
              type="text"
              id="location"
              className="w-full rounded-md bg-stone-100 p-2 text-sm shadow-sm"
              {...register("location", {
                required: "Please enter your location",
              })}
              autoComplete="off"
            />
            {errors.location && <Error>{errors.location.message}</Error>}
          </div>
        </div>

        <div className="mt-4 flex w-full justify-end gap-2">
          <Button
            type="doctor"
            purpose="submit"
            size="small"
            disabled={isUpdating}
          >
            Update
          </Button>
          <Button
            type="cancel"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              reset();
              closeModal();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

EditDonorProfileForm.propTypes = {
  closeModal: propTypes.func.isRequired,
};

export default EditDonorProfileForm;
