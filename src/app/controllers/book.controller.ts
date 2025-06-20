import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
  const query: any = {};
  if (filter) query.genre = filter;

  const books = await Book.find(query)
    .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
    .limit(Number(limit));

  res.json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.bookId);
  res.json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
  });
  res.json({ success: true, message: "Book updated successfully", data: book });
};

export const deleteBook = async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.bookId);
  res.json({ success: true, message: "Book deleted successfully", data: null });
};
