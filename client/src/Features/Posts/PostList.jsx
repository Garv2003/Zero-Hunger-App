import Empty from "../../ui/Empty";
import Post from "./Post";
import usePosts from "./usePosts";

function PostList() {
  const posts = [
    {
      id: 1,
      organisation: "Tech Corp",
      organisationId: "3",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Innovative Solutions in Tech",
      description:
        "Tech Corp is leading the industry with its innovative solutions and cutting-edge technology.",
    },
    {
      id: 2,
      organisation: "Green Energy",
      organisationId: "2",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Sustainable Energy Sources",
      description:
        "Green Energy focuses on providing sustainable and renewable energy solutions to reduce carbon footprint.",
    },
    {
      id: 3,
      organisation: "Health Plus",
      organisationId: "1",
      image:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Advancements in Healthcare",
      description:
        "Health Plus is at the forefront of healthcare advancements, ensuring better health for everyone.",
    },
    {
      id: 4,
      organisation: "EduWorld",
      organisationId: "4",
      image:
        "https://images.unsplash.com/photo-1494173853739-c21f58b16055?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Revolutionizing Education",
      description:
        "EduWorld is revolutionizing the education sector with its innovative learning platforms and resources.",
    },
    {
      id: 5,
      organisation: "Foodies United",
      organisationId: "5",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Culinary Delights",
      description:
        "Foodies United brings together the best chefs to create delightful culinary experiences.",
    },
  ];

  const { postsList = [], loadingPosts } = usePosts();
  if (postsList.length === 0) return <Empty resource="posts" />;

  return (
    <ul className="mx-auto flex w-full flex-col gap-10">
      {postsList.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </ul>
  );
}

export default PostList;
