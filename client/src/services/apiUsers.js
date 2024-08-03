import axios from "axios";
import { uploadProfileImage } from "../utils/uploadImage";

export async function registerUser(newUser) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/auth/register",
      newUser,
    );
    console.log(res.data);
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

export async function loginUser(newUser) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/auth/login",
      newUser,
    );
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      console.log(res.data.user);
      return res.data.user;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function editUserProfile({ newUser, _id }) {
  try {
    if (newUser.image && typeof newUser.image !== "string") {
      newUser.image = await uploadProfileImage(newUser.image[0]);
    }
    console.log(newUser);
    const response = await axios.post(
      import.meta.env.VITE_API_URL + `/api/auth/update/${_id}`,
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.data.success) {
      return response.data.user;
    } else {
      throw new Error(response.data.message);
    }

    // localStorage.setItem("user", JSON.stringify(updatedUser));
    // reset();
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
