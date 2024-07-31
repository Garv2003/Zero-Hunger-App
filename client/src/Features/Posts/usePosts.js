import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";

function usePosts() {
  const { data: postsList, isPending: loadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await getPosts();
    },
  });
  return { postsList, loadingPosts };
}

export default usePosts;
