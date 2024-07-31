import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  user: {
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
