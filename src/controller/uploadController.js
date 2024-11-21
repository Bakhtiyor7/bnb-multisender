"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadService_1 = require("../service/uploadService");
let uploadController = {};
uploadController.uploadData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenAddress, dataItems } = req.body;
        // Input validation
        if (!tokenAddress || !Array.isArray(dataItems)) {
            return res.status(400).json({ error: "Invalid input data" });
        }
        const upload = yield (0, uploadService_1.createUpload)({
            tokenAddress,
            dataItems,
        });
        return res.status(201).json({
            message: "Data uploaded successfully",
            id: upload.id,
        });
    }
    catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({ error: "Error saving data" });
    }
});
uploadController.getUploadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upload = yield (0, uploadService_1.getUploadByIdService)(Number(req.params.id));
        if (!upload) {
            return res.status(404).json({ error: "Data not found" });
        }
        return res.json(upload);
    }
    catch (error) {
        console.error("Error retrieving data:", error);
        return res.status(500).json({ error: "Error retrieving data" });
    }
});
uploadController.updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, transactionHash } = req.body;
        const uploadId = Number(req.params.id);
        // Validate the status value
        if (!["pending", "completed", "failed"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        yield (0, uploadService_1.updateUploadStatus)(uploadId, status, transactionHash);
        return res.json({ message: "Upload status updated successfully" });
    }
    catch (error) {
        console.error("Error updating upload status:", error);
        return res.status(500).json({ error: "Error updating upload status" });
    }
});
exports.default = uploadController;
