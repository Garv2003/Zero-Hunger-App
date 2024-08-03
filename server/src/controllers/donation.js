import Donation from "../models/donation.js";

export const getDonations = async (req, res) => {
  try {
    if (req.user.user.category === "Organization") {
      const donations = await Donation.find({ organization: req.user._id })
        .populate("donor", -"password")
        .populate("organization", -"password");
      console.log(donations);
      res.status(200).json({ success: true, donations });
    } else {
      const donations = await Donation.find({ donor: req.user._id })
        .populate("donor", -"password")
        .populate("organization", -"password");
      res.status(200).json({ success: true, donations });
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

export const dashboard = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalDonors = await Donation.distinct("donor").then(
      (donors) => donors.length
    );

    const totalFoodDonated = await Donation.aggregate([
      { $match: { type: "Food" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]).then((result) => result[0]?.total || 0);

    const totalMoneyDonated = await Donation.aggregate([
      { $match: { type: "Money" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]).then((result) => result[0]?.total || 0);

    const dashboard = [
      {
        label: "Total Donations",
        value: totalDonations,
      },
      {
        label: "Total Donors",
        value: totalDonors,
      },
      {
        label: "Total Food Donated",
        value: totalFoodDonated,
      },
      {
        label: "Total Money Donated",
        value: totalMoneyDonated,
      },
    ];

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
