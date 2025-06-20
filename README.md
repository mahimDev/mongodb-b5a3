# 📚 Library Management System API

This is a Library Management System backend built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

## 🚀 Features

- Add, update, delete, and retrieve books
- Borrow books with quantity & due date
- Auto-update availability based on copies
- Summary of all borrowed books (with aggregation)
- Mongoose validation, static methods, and middleware used
- Filtering, sorting, and pagination support

## 📦 Technologies Used

- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- ts-node-dev for development

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd assignment-3
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library-api
```

4. **Run the development server**

```bash
npm run dev
```

## 📁 API Endpoints

### 📘 Books

#### ➕ Create Book

`POST /api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 📚 Get All Books (with filters)

`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### 📖 Get Book by ID

`GET /api/books/:bookId`

#### ✏️ Update Book

`PUT /api/books/:bookId`

```json
{
  "copies": 10
}
```

#### ❌ Delete Book

`DELETE /api/books/:bookId`

---

### 📗 Borrow

#### ➕ Borrow a Book

`POST /api/borrow`

```json
{
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18"
}
```

#### 📊 Borrow Summary

`GET /api/borrow`

```json
[
  {
    "book": { "title": "The Theory of Everything", "isbn": "9780553380163" },
    "totalQuantity": 5
  }
]
```

---

## ✅ Assignment Requirements Met

- [x] Schema validation
- [x] Business logic: availability on borrow
- [x] Aggregation for borrow summary
- [x] Static method: `updateAvailability`
- [x] Middleware: `pre('save')` for borrow
- [x] Filtering and sorting in book list

## 📹 Bonus (Optional)

- Add a short video explanation
- Add Postman collection

---

## ✍️ Author

Made with 💻 for assignment in Express + TypeScript + MongoDB course.

Feel free to customize further!
