import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthProvider";
import { loginUser } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";
function useAuthenticateUser() {
  const { loginFunc } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: authenticateFunc, isPending: islogingUser } = useMutation({
    mutationFn: async (d) => {
      const data = await loginUser(d);
      loginFunc(data);
      navigate("/app");
    },
  });
  return { authenticateFunc, islogingUser };
}

export default useAuthenticateUser;
