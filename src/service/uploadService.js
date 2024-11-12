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
exports.getUploadByIdService = exports.createUpload = void 0;
// src/services/uploadService.ts
const typeorm_1 = require("typeorm");
const Upload_1 = require("../entity/Upload");
const DataItem_1 = require("../entity/DataItem");
const createUpload = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { uploaderAddress, tokenAddress, dataItems } = data;
    const uploadRepository = (0, typeorm_1.getRepository)(Upload_1.Upload);
    const upload = new Upload_1.Upload();
    upload.uploaderAddress = uploaderAddress;
    upload.tokenAddress = tokenAddress;
    // Map data items to entities
    upload.dataItems = dataItems.map((item) => {
        const dataItem = new DataItem_1.DataItem();
        dataItem.recipientAddress = item.to;
        dataItem.amount = item.amount;
        return dataItem;
    });
    // Save to the database
    yield uploadRepository.save(upload);
    return upload;
});
exports.createUpload = createUpload;
const getUploadByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadRepository = (0, typeorm_1.getRepository)(Upload_1.Upload);
    const upload = yield uploadRepository.findOne({
        where: { id },
        relations: ["dataItems"],
    });
    return upload;
});
exports.getUploadByIdService = getUploadByIdService;
