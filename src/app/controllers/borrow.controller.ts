import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
};

export const getBorrowSummary = async (_req: Request, res: Response) => {
  const data = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookInfo",
      },
    },
    { $unwind: "$bookInfo" },
    {
      $project: {
        book: {
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  res.json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data,
  });
};
