// src/routes/uploadRoutes.ts
import express from "express";
import uploadController from "../controller/uploadController";

const router = express.Router();
console.log("router:", router);
router.post("/", uploadController.uploadData); // Endpoint to upload data
router.get("/:id", uploadController.getUploadById); // Endpoint to fetch data by ID

export default router;
