import { useMutation } from "@tanstack/react-query";

import { newPost } from "../../services/apiPosts";

function useCreatePost() {
  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: (d) => {
      newPost(d);
    },
  });
  return { createPost, isCreating };
}

export default useCreatePost;
