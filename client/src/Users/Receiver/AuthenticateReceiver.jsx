import { useForm } from "react-hook-form";
import { useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye } from "react-icons/fa6";
import Error from "../../ui/Error";
import Button from "../../ui/Button";
import BackBtn from "../../ui/BackBtn";
import useAuthenticateUser from "../useAuthenticateUser";
import Loader from "../../ui/Loader";

function AuthenticateReceiver() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState("");
  const { authenticateFunc, islogingUser } = useAuthenticateUser();

  const onSubmit = (data) => {
    const creds = {
      email: data.email,
      password: data.password,
      user: { type: "Organization" },
    };
    authenticateFunc(creds);
  };

  if (islogingUser) {
    return <Loader />;
  }

  return (
    <>
      <div className="mx-auto mb-4 w-[30rem] rounded-lg bg-white p-4 shadow-lg max-[768px]:w-[400px] max-[520px]:w-[300px] max-[410px]:w-full">
        <BackBtn />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2"
        >
          <div className="w-full">
            <label htmlFor="email" className="w-full text-sm font-medium">
              Organisation Email
            </label>

            <input
              type="text"
              className="mt-1 w-full rounded-md bg-stone-200 p-2 text-sm"
              id="email"
              {...register("email", {
                required: "This is a required field",
              })}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
          </div>

          <div className="w-full">
            <label htmlFor="password" className="w-full text-sm font-medium">
              Password
            </label>

            <div className="mt-1 flex w-full">
              {showPass === "password" ? (
                <p className="grow rounded-md bg-stone-200 p-2 text-sm dark:bg-stone-300">
                  {watch("password")}
                </p>
              ) : (
                <input
                  type="password"
                  id="password"
                  className="min-w-0 grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                  {...register("password", {
                    required: "This is a required field",
                  })}
                />
              )}
              <button
                className="ms-[-2px] p-2 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass((p) => (p === "password" ? "" : "password"));
                }}
              >
                {" "}
                <>{showPass === "password2" ? <FaEye /> : <TbEyeClosed />}</>
              </button>
            </div>
            {errors.password2 && <Error>{errors.password2.message}</Error>}
          </div>

          <div className="mt-2 flex w-full justify-end gap-4">
            <Button
              type="doctor"
              purpose="submit"
              disabled={false}
              size="small"
            >
              Login
            </Button>
            <Button
              type="cancel"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
              size="small"
            >
              Cancel
            </Button>
          </div>

          <Button to="/signup" type="cancel" size="small">
            New user?
          </Button>
        </form>
      </div>
    </>
  );
}
export default AuthenticateReceiver;
