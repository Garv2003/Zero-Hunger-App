import { useForm } from "react-hook-form";
import { useState } from "react";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import { validatePassword } from "../../utils/password";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import BackBtn from "../../ui/BackBtn";
import useRegisterUser from "../useRegisterUser";

function RegisterDonor() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { registerFunc, issigningUser } = useRegisterUser();
  const [showPass, setShowPass] = useState("");
  const pass1 = watch("password1", "");
  const passCriteria = validatePassword(pass1);

  const onSubmit = (data) => {
    const newUser = {
      user: {
        type: "Donor",
        category: data.userType,
      },
      password: data.password1,
      email: data.userEmail,
      name: data.name,
      location: data.location,
    };
    registerFunc(newUser);
  };

  if (issigningUser) {
    return <p>Signing up...</p>;
  }

  return (
    <>
      <div className="mx-auto w-[30rem] rounded-lg px-4 py-2 shadow-md max-[768px]:w-[500px] max-[520px]:w-[400px] max-[410px]:w-full">
        <BackBtn />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-1"
        >
          <div>
            <label htmlFor="userType" className="w-full text-sm font-medium">
              User Type
            </label>

            <select
              id="userType"
              className="mt-1 w-full rounded-md bg-stone-200 p-2 text-sm"
              {...register("userType", {
                required: "This is a required field",
              })}
            >
              <option value="">Select User Type</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
              <option value="LocalRestaurant">Local Restaurant</option>
            </select>
            {errors.userType && <Error>{errors.userType.message}</Error>}
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
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
              Email
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
          <div className="w-full">
            <label htmlFor="password1" className="text-sm font-medium">
              Password
            </label>
            <div className="my-1 w-full">
              <div className="flex">
                {showPass === "password1" ? (
                  <input
                    type="text"
                    disabled
                    value={watch("password1")}
                    className="grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                  ></input>
                ) : (
                  <input
                    type="password"
                    id="password1"
                    className="min-w-0 grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                    {...register("password1", {
                      required: "Please provide your password",
                      validate: (value) =>
                        validatePassword(value).every(
                          (criterion) => criterion.isMet,
                        ) || "Password does not meet all criteria",
                    })}
                  />
                )}
                <button
                  className="ms-[-2px] p-2 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass((p) => (p === "password1" ? "" : "password1"));
                  }}
                >
                  <>{showPass === "password1" ? <FaEye /> : <TbEyeClosed />}</>
                </button>
              </div>
              {errors.password1 && (
                <ul>
                  {passCriteria.map((val) => (
                    <Error key={val.label} check={val.isMet ? "on" : "off"}>
                      {val.label}
                    </Error>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="password2" className="text-sm font-medium">
              Confirm Password
            </label>
            <div className="my-1">
              <div className="flex w-full">
                {showPass === "password2" ? (
                  <input
                    type="text"
                    value={watch("password2")}
                    className="grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                  ></input>
                ) : (
                  <input
                    type="password"
                    id="password2"
                    className="min-w-0 grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                    {...register("password2", {
                      required: "Please confirm your password",
                      validate: () =>
                        watch("password1") === watch("password2")
                          ? true
                          : "Passwords do not match",
                    })}
                  />
                )}
                <button
                  className="ms-[-2px] p-2 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass((p) => (p === "password2" ? "" : "password2"));
                  }}
                >
                  {" "}
                  <>{showPass === "password2" ? <FaEye /> : <TbEyeClosed />}</>
                </button>
              </div>
              {errors.password2 && <Error>{errors.password2.message}</Error>}
            </div>
          </div>

          <div className="mt-1 flex w-full justify-end gap-2">
            <Button
              type="doctor"
              purpose="submit"
              size="small"
              disabled={false}
            >
              Signup
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
          <Button to="/login" type="cancel" size="small">
            Already a user?
          </Button>
        </form>
      </div>
    </>
  );
}

export default RegisterDonor;
