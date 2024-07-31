import axios from "axios";

export async function getPosts() {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/post/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.posts;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function newPost(newPost) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/post/create",
      newPost,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.post;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
