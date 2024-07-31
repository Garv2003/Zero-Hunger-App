import axios from "axios";

export async function makeDonation(donationObj) {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/donation/donation",
      donationObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.donation;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getDonations(type) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/donation/donations/" + type,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (res.data.success) {
      return res.data.donations;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
