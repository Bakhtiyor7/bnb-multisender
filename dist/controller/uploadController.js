"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadService_1 = require("../service/uploadService");
let uploadController = {};
uploadController.uploadData = async (req, res) => {
    try {
        console.log('payload:::', req.body);
        const { dataItems } = req.body;
        console.log('dataItems', dataItems);
        // Input validation
        // if ( !Array.isArray(dataItems)) {
        //   return res.status(400).json({ error: "Invalid input data" });
        // }
        const upload = await (0, uploadService_1.createUpload)({ dataItems });
        return res.status(201).json({
            message: "Data uploaded successfully",
            id: upload.id,
        });
    }
    catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({ error: "Error saving data" });
    }
};
uploadController.getUploadById = async (req, res) => {
    try {
        const upload = await (0, uploadService_1.getUploadByIdService)(Number(req.params.id));
        if (!upload) {
            return res.status(404).json({ error: "Data not found" });
        }
        return res.json(upload);
    }
    catch (error) {
        console.error("Error retrieving data:", error);
        return res.status(500).json({ error: "Error retrieving data" });
    }
};
uploadController.updateStatus = async (req, res) => {
    try {
        const { status, transactionHash } = req.body;
        const uploadId = Number(req.params.id);
        // Validate the status value
        if (!["pending", "completed", "failed"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        await (0, uploadService_1.updateUploadStatus)(uploadId, status, transactionHash);
        return res.json({ message: "Upload status updated successfully" });
    }
    catch (error) {
        console.error("Error updating upload status:", error);
        return res.status(500).json({ error: "Error updating upload status" });
    }
};
exports.default = uploadController;
