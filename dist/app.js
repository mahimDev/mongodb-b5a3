"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const book_route_1 = __importDefault(require("./app/routes/book.route"));
const borrow_route_1 = __importDefault(require("./app/routes/borrow.route"));
const app = (0, express_1.default)();
// app.use(cors());
app.use(express_1.default.json());
app.use("/books", book_route_1.default);
app.use("/borrow", borrow_route_1.default);
app.use((err, _req, res, _next) => {
    res.status(400).json({
        message: "Validation failed",
        success: false,
        error: err,
    });
});
exports.default = app;
