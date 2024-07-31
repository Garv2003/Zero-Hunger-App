import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/apiUsers";

import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function useRegisterUser() {
  const { loginFunc } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: registerFunc, isPending: issigningUser } = useMutation({
    mutationFn: async (d) => {
      const data = await registerUser(d);
      loginFunc(data);
      navigate("/app");
    },
  });
  return { registerFunc, issigningUser };
}

export default useRegisterUser;
