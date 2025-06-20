import { Schema, model, Document, Model } from "mongoose";

const genres = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;
type Genre = (typeof genres)[number];

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>;
}

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: genres, required: true },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
