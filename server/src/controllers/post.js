import Post from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "-password")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      author: req.user._id,
    };

    const newPost = new Post(post);

    const response = await newPost.save();

    res
      .status(201)
      .json({ success: true, post: { ...response, author: req.user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
