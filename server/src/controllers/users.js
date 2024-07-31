import User from "../models/user.js";

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await User.find({
      "user.type": "Receiver",
    }).select("-password");

    res.status(200).json({ success: true, organizations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const organization = await User.findOne({
      _id: req.params.id,
      "user.type": "Receiver",
    }).select("-password");

    if (!organization) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found" });
    }

    res.status(200).json({ success: true, organization });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getDonors = async (req, res) => {
  try {
    const donors = await User.find({ "user.type": "Donor" }).select(
      "-password"
    );

    res.status(200).json({ success: true, donors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
