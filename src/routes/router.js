"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/uploadRoutes.ts
const express_1 = __importDefault(require("express"));
const uploadController_1 = __importDefault(require("../controller/uploadController"));
const router = express_1.default.Router();
router.post("/", uploadController_1.default.uploadData); // Endpoint to upload data
router.get("/:id", uploadController_1.default.getUploadById); // Endpoint to fetch data by ID
exports.default = router;