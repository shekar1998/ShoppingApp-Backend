"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UsersSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    bioData: {
        type: String,
    },
    posts: {
        type: Array,
    },
    OTP: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: "users" });
var userModel = mongoose_1.default.model("users", UsersSchema);
exports.default = userModel;
