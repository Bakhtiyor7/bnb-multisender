"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadByIdService = exports.createUpload = void 0;
exports.updateUploadStatus = updateUploadStatus;
const Upload_1 = require("../entity/Upload");
const DataItem_1 = require("../entity/DataItem");
const typeormConfig_1 = require("../config/typeormConfig");
// Create an upload record with associated data items
const createUpload = async (data) => {
    const { dataItems } = data;
    console.log("dataItems service", dataItems);
    const uploadRepository = typeormConfig_1.AppDataSource.getRepository(Upload_1.Upload);
    const dataItemRepository = typeormConfig_1.AppDataSource.getRepository(DataItem_1.DataItem);
    // Create a new upload entity
    const upload = new Upload_1.Upload();
    // Save the upload record first
    await uploadRepository.save(upload);
    // Map data items to entities and associate them with the upload
    const dataItemEntities = dataItems.map((item) => {
        const dataItem = new DataItem_1.DataItem();
        dataItem.recipientAddress = item.address;
        dataItem.amount = item.amount.toString();
        dataItem.tokenAddress = item.tokenAddress; // Use tokenAddress from dataItem
        dataItem.upload = upload;
        return dataItem;
    });
    console.log(dataItemEntities);
    // Save all data items
    await dataItemRepository.save(dataItemEntities);
    return upload;
};
exports.createUpload = createUpload;
// Retrieve an upload by its ID with associated data items
const getUploadByIdService = async (id) => {
    const uploadRepository = typeormConfig_1.AppDataSource.getRepository(Upload_1.Upload);
    const upload = await uploadRepository.findOne({
        where: { id },
        relations: ["dataItems"], // Include related data items
    });
    return upload;
};
exports.getUploadByIdService = getUploadByIdService;
// Update the status of an upload
async function updateUploadStatus(id, status, transactionHash) {
    const uploadRepository = typeormConfig_1.AppDataSource.getRepository(Upload_1.Upload);
    // Find the upload by ID
    const upload = await uploadRepository.findOne({ where: { id } });
    if (!upload) {
        throw new Error("Upload not found");
    }
    // Update status and optional transaction hash
    upload.status = status;
    if (transactionHash) {
        upload.transactionHash = transactionHash;
    }
    await uploadRepository.save(upload);
}
