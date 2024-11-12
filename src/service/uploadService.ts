// src/services/uploadService.ts
import { getRepository } from "typeorm";
import { Upload } from "../entity/Upload";
import { DataItem } from "../entity/DataItem";

export const createUpload = async (data: {
  uploaderAddress: string;
  tokenAddress: string;
  dataItems: { to: string; amount: string }[];
}) => {
  const { uploaderAddress, tokenAddress, dataItems } = data;

  const uploadRepository = getRepository(Upload);
  const upload = new Upload();
  upload.uploaderAddress = uploaderAddress;
  upload.tokenAddress = tokenAddress;

  // Map data items to entities
  upload.dataItems = dataItems.map((item) => {
    const dataItem = new DataItem();
    dataItem.recipientAddress = item.to;
    dataItem.amount = item.amount;
    return dataItem;
  });

  // Save to the database
  await uploadRepository.save(upload);

  return upload;
};

export const getUploadByIdService = async (id: number) => {
  const uploadRepository = getRepository(Upload);
  const upload = await uploadRepository.findOne({
    where: { id },
    relations: ["dataItems"],
  });

  return upload;
};
