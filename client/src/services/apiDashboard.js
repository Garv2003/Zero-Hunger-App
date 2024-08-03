import axios from "axios";

export async function getDashboard() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/donation/dashboard",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (response.data.success) {
      return response.data.dashboard;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    throw new Error("Failed to get dashboard data");
  }
}
