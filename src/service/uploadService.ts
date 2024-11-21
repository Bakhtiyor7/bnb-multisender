// src/services/uploadService.ts
import { getRepository } from "typeorm";
import { Upload } from "../entity/Upload";
import { DataItem } from "../entity/DataItem";
import { AppDataSource } from "../config/typeormConfig";

export const createUpload = async (data: {
  tokenAddress: string;
  dataItems: { address: string; amount: string }[];
}) => {
  const { tokenAddress, dataItems } = data;

  const uploadRepository = AppDataSource.getRepository(Upload);
  const upload = new Upload();
  upload.tokenAddress = tokenAddress;

  // Map data items to entities
  upload.dataItems = dataItems.map((item) => {
    const dataItem = new DataItem();
    dataItem.recipientAddress = item.address;
    dataItem.amount = item.amount;
    return dataItem;
  });

  // Save to the database
  await uploadRepository.save(upload);

  return upload;
};

export const getUploadByIdService = async (id: number) => {
  const uploadRepository = AppDataSource.getRepository(Upload);

  const upload = await uploadRepository.findOne({
    where: { id },
    relations: ["dataItems"],
  });

  return upload;
};

export async function updateUploadStatus(
  id: number,
  status: "pending" | "completed" | "failed",
  transactionHash?: string
): Promise<void> {
  const uploadRepository = AppDataSource.getRepository(Upload);
  const upload = await uploadRepository.findOne({ where: { id } });

  if (!upload) {
    throw new Error("Upload not found");
  }

  upload.status = status;
  if (transactionHash) {
    upload.transactionHash = transactionHash;
  }

  await uploadRepository.save(upload);
}
