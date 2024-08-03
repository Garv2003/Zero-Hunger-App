import Feedback from "../models/feedback.js";

export const createFeedback = async (req, res) => {
  const { message, rating, org_id } = req.body;
  const donor = req.user._id;

  try {
    if (req.user.user.type !== "Donor") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const feedback = new Feedback({
      message,
      rating,
      donor,
      organization: org_id,
    });
    await feedback.save();

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      organization: req.params.id,
    }).populate("donor", "-password");
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
