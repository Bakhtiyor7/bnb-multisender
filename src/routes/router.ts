// src/routes/uploadRoutes.ts
import express from "express";
import uploadController from "../controller/uploadController";

const router = express.Router();
router.post("/uploads", uploadController.uploadData); // Endpoint to upload data
router.get("/uploads/:id", uploadController.getUploadById); // Endpoint to fetch data by ID

export default router;
