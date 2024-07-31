import axios from "axios";

export async function registerUser(newUser) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/auth/register",
      newUser,
    );
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err?.message);
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
      return res.data.user;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
