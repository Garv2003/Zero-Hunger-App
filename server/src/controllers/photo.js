import Photo from "../models/photo.js";

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ organization: req.params.id }).populate(
      "organization",
      "-password"
    );
    res.json({ success: true, photos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const createPhoto = async (req, res) => {
  console.log(req.body);
  try {
    if (req.user.user.type !== "Receiver") {
      console.log(req.user.user.type);
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const photo = new Photo({
      url: req.body.imageUrl,
      organization: req.user._id,
    });

    const newPhoto = await photo.save();
    res.status(201).json({ success: true, photo: newPhoto });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
