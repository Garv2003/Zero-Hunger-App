import axios from "axios";

export async function getOrganizations() {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/users/organizations",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.organizations;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getOrganizationById(id) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/users/organization/" + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.organization;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
