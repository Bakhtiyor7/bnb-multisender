// src/controllers/uploadController.ts
import { Request, Response } from "express";
import {
  createUpload,
  getUploadByIdService,
  updateUploadStatus,
} from "../service/uploadService";

let uploadController: any = {};

uploadController.uploadData = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    console.log('payload:::', req.body)
    const { dataItems } = req.body;

    console.log('dataItems', dataItems);

    // Input validation
    // if ( !Array.isArray(dataItems)) {
    //   return res.status(400).json({ error: "Invalid input data" });
    // }

    const upload = await createUpload({dataItems}
    );

    return res.status(201).json({
      message: "Data uploaded successfully",
      id: upload.id,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "Error saving data" });
  }
};

uploadController.getUploadById = async (
  req: Request,
  res: Response
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

uploadController.updateStatus = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { status, transactionHash } = req.body;
    const uploadId = Number(req.params.id);

    // Validate the status value
    if (!["pending", "completed", "failed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    await updateUploadStatus(uploadId, status, transactionHash);

    return res.json({ message: "Upload status updated successfully" });
  } catch (error) {
    console.error("Error updating upload status:", error);
    return res.status(500).json({ error: "Error updating upload status" });
  }
};

export default uploadController;
