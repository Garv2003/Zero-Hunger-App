import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import propTypes from "prop-types";
import axios from "axios";
import { uploadProfileImage } from "../../utils/uploadImage";

function EditOrganizationProfileForm({ organization }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: organization.name,
      userEmail: organization.email,
      location: organization.location,
      phone: organization.phone,
      image: organization.image,
      description: organization.description,
    },
  });

  const onSubmit = async (data) => {
    if (typeof data.image[0] !== "string") {
      data.image = await uploadProfileImage(data.image[0]);
    }
    const newUser = {
      name: data.name,
      user: {
        type: "Organization",
      },
      email: data.userEmail,
      phone: data.phone,
      image: data.image,
      location: data.location,
      description: data.description,
    };
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/api/auth/update/${organization._id}`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const { user: updatedUser } = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-[30rem] flex-col gap-1"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Organization Name
          </label>
          <div className="my-1 w-full">
            <input
              type="text"
              id="firstName"
              className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
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
            Organization Email
          </label>
          <div className="my-1">
            <input
              type="email"
              autoComplete="on"
              className="w-full flex-1 rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
              id="userEmail"
              {...register("userEmail", {
                required: "Please enter your email",
              })}
            />
            {errors.userEmail && <Error>{errors.userEmail.message}</Error>}
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
              className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
              {...register("location", {
                required: "Please enter your location",
              })}
              autoComplete="off"
            />
            {errors.location && <Error>{errors.location.message}</Error>}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="font-semibold text-stone-700">
            Description
          </label>
          <div>
            <textarea
              id="description"
              {...register("description")}
              className="w-full bg-stone-100 p-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="text-sm font-medium">
            Organization photo
          </label>
          <div className="my-1 w-full">
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image")}
            />
            {errors?.image && <Error>{errors.image.message}</Error>}
          </div>
        </div>

        <div className="mt-3 flex w-full justify-end gap-2">
          <Button type="doctor" purpose="submit" size="small" disabled={false}>
            Update
          </Button>
          <Button
            type="cancel"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

EditOrganizationProfileForm.propTypes = {
  organization: propTypes.object.isRequired,
};

export default EditOrganizationProfileForm;
