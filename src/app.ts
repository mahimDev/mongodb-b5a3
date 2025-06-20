import express from "express";
import mongoose from "mongoose";
// import cors from "cors";
import bookRoutes from "./app/routes/book.route";
import borrowRoutes from "./app/routes/borrow.route";

const app = express();

// app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }
);

export default app;
