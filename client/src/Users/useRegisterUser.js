import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/apiUsers";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function useRegisterUser() {
  const { loginFunc } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: registerFunc, isPending: issigningUser } = useMutation({
    mutationFn: (d) => registerUser(d),
    onSuccess: (data) => {
      loginFunc(data);
      toast.success("Signin successfull");
      navigate("/app");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Signin failed");
      navigate("/");
    },
  });
  return { registerFunc, issigningUser };
}

export default useRegisterUser;
