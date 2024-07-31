import Donation from "../models/donation.js";

export const getDonations = async (req, res) => {
  try {
    if (req.user.user.category === "Organization") {
      const donations = await Donation.find({ organization: req.user._id })
        .populate("donor", -"password")
        .populate("organization", -"password");
      res.status(200).json({ success: true, donations });
      return;
    } else {
      const donations = await Donation.find({ donor: req.user._id })
        .populate("donor", -"password")
        .populate("organization", -"password");
      res.status(200).json({ success: true, donations });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDonation = async (req, res) => {
  console.log(req.body);
  try {
    const newDonation = {
      message: req.body.message,
      type: req.body.type,
      amount: req.body.amount,
      donor: req.user._id,
      organization: req.body.organization._id,
      foodType: req.body.foodType,
      quantity: req.body.quantity,
    };

    const donation = await Donation.create(newDonation);
    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
