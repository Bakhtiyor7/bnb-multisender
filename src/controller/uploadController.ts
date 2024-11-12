// src/controllers/uploadController.ts
import { Request, Response } from "express";
import { createUpload, getUploadByIdService } from "../service/uploadService";

let uploadController: any = {};

uploadController.uploadData = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const upload = await createUpload(req.body);
    return res
      .status(201)
      .json({ message: "Data uploaded successfully", id: upload.id });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "Error saving data" });
  }
};

uploadController.getUploadById = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const upload = await getUploadByIdService(Number(req.params.id));

    if (!upload) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.json(upload);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Error retrieving data" });
  }
};

export default uploadController;
