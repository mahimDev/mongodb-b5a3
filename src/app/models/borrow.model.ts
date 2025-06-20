import { Schema, model, Document, Types } from "mongoose";
import { Book, BookModel } from "./book.model";

export interface IBorrow extends Document {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

borrowSchema.pre("save", async function (next) {
  try {
    const book = await Book.findById(this.book);
    if (!book || book.copies < this.quantity) {
      return next(new Error("Not enough copies available"));
    }
    book.copies -= this.quantity;
    await book.save();
    const bookId = book.id;
    await (Book as BookModel).updateAvailability(bookId.toString());
    next();
  } catch (error) {
    next();
  }
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
