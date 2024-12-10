import { getRepository } from "typeorm";
import { Upload } from "../entity/Upload";
import { DataItem } from "../entity/DataItem";
import { AppDataSource } from "../config/typeormConfig";

// Create an upload record with associated data items
export const createUpload = async (data: {
  dataItems: { address: string; amount: string; tokenAddress: string }[];
}) => {
  const { dataItems } = data;

  console.log("dataItems service", dataItems);

  const uploadRepository = AppDataSource.getRepository(Upload);
  const dataItemRepository = AppDataSource.getRepository(DataItem);

  // Create a new upload entity
  const upload = new Upload();

  // Save the upload record first
  await uploadRepository.save(upload);

  // Map data items to entities and associate them with the upload
  const dataItemEntities = dataItems.map((item) => {
    const dataItem = new DataItem();
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

// Retrieve an upload by its ID with associated data items
export const getUploadByIdService = async (id: number) => {
  const uploadRepository = AppDataSource.getRepository(Upload);

  const upload = await uploadRepository.findOne({
    where: { id },
    relations: ["dataItems"], // Include related data items
  });

  return upload;
};

// Update the status of an upload
export async function updateUploadStatus(
  id: number,
  status: "pending" | "completed" | "failed",
  transactionHash?: string
): Promise<void> {
  const uploadRepository = AppDataSource.getRepository(Upload);

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
