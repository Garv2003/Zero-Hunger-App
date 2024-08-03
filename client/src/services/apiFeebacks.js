import axios from "axios";

export async function getFeedbacks(id) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/feedback/list/" + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.feedbacks;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function addFeedback(feedbackObj) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/feedback/create",
      feedbackObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.feedback;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
