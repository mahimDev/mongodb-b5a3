"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
// libraryManagement
// pQSgCJ1NIO9vUCVT
mongoose_1.default
    .connect(process.env.MONGODB_URI ||
    `mongodb+srv://libraryManagement:pQSgCJ1NIO9vUCVT@practice.hcuo4.mongodb.net/?retryWrites=true&w=majority&appName=practice`)
    .then(() => {
    console.log("MongoDB connected");
    app_1.default.listen(port, () => console.log(`Server running on port ${port}`));
})
    .catch((err) => console.error(err));
