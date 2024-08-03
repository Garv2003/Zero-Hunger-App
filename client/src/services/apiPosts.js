import axios from "axios";
import { uploadProfileImage } from "../utils/uploadImage";

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
  } catch (error) {
    throw new Error(error);
  }
}

export async function newPostFunc({ newPost }) {
  console.log(newPost);
  try {
    if (typeof newPost.image !== "string") {
      newPost.image = await uploadProfileImage(newPost.image[0]);
    }
    console.log(newPost);
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
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
