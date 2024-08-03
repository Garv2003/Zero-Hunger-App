import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthProvider";
import { editUserProfile } from "../services/apiUsers";
import toast from "react-hot-toast";
function useEditProfile() {
  const { loginFunc } = useAuthContext();
  const queryClient = useQueryClient();
  const { mutate: editProfileFunc, isPending: isUpdating } = useMutation({
    mutationFn: ({ newUser, _id }) => editUserProfile({ newUser, _id }),
    onSuccess: (updatedUser) => {
      console.log(updatedUser);
      loginFunc(updatedUser);
      toast.success("Profile Updated");
      if (updatedUser.user.type === "Receiver") {
        queryClient.invalidateQueries({
          queryKey: ["organization", updatedUser._id],
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update profile");
      navigate("/");
    },
  });
  return { editProfileFunc, isUpdating };
}

export default useEditProfile;
