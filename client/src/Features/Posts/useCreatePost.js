import { useMutation, useQueryClient } from "@tanstack/react-query";

import { newPostFunc } from "../../services/apiPosts";
import toast from "react-hot-toast";

function useCreatePost() {
  const queryClient = useQueryClient();
  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: ({ newPost }) => newPostFunc({ newPost }),
    onSuccess: () => {
      toast.success("Post created");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create post");
    },
  });
  return { createPost, isCreating };
}

export default useCreatePost;
