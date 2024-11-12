import { DataSource } from "typeorm";
import { Upload } from "../entity/Upload";
import { DataItem } from "../entity/DataItem";
import * as dotenv from "dotenv";
dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "bahhtee",
  password: "baxti7877",
  database: "multisender",
  entities: [Upload, DataItem],
  synchronize: true,
});
