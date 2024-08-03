import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthProvider";
import { loginUser } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function useAuthenticateUser() {
  const { loginFunc } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: authenticateFunc, isPending: islogingUser } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      loginFunc(data);
      toast.success("Login successfull");
      navigate("/app");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Login failed");
      navigate("/");
    },
  });
  return { authenticateFunc, islogingUser };
}

export default useAuthenticateUser;
