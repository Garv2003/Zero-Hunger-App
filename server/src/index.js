import express from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/mongoDB.js";
import authRouter from "./routes/auth.js";
import testRouter from "./routes/test.js";
import UserRouter from "./routes/users.js";
import donation from "./routes/donation.js";
import post from "./routes/post.js";
import photo from "./routes/photo.js";
import feedback from "./routes/feedback.js";
import message from "./routes/message.js";

import jwtVerify from "./middleware/verifyToken.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.use(jwtVerify);

app.use("/", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", UserRouter);
app.use("/api/donation", donation);
app.use("/api/post", post);
app.use("/api/photo", photo);
app.use("/api/feedback", feedback);
app.use("/api/message", message);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
