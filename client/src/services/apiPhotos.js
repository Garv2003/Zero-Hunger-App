import axios from "axios";
import { uploadPhotoImage } from "../utils/uploadImage";

export async function getPhotos(id) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/photo/photos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.photos;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function addPhoto(image) {
  try {
    const imageUrl = await uploadPhotoImage(image.image.image.imageFile);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/photo/create`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.photo;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
