import { DataSource } from "typeorm";
import { Upload } from "../entity/Upload";
import { DataItem } from "../entity/DataItem";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Upload, DataItem],
  synchronize: process.env.NODE_ENV === "development",
});
