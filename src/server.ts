import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
// libraryManagement
// pQSgCJ1NIO9vUCVT
mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://libraryManagement:pQSgCJ1NIO9vUCVT@practice.hcuo4.mongodb.net/?retryWrites=true&w=majority&appName=practice`
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(err));
