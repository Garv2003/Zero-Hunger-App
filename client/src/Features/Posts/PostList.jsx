import Empty from "../../ui/Empty";
import Loader from "../../ui/Loader";
import Post from "./Post";
import usePosts from "./usePosts";

function PostList() {
  const { postsList = [], loadingPosts } = usePosts();
  if (loadingPosts) return <Loader />;
  if (postsList.length === 0) return <Empty resource="posts" />;

  return (
    <>
      <ul className="mx-auto flex w-full flex-col gap-10">
        {postsList.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
