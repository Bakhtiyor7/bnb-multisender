"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Upload_1 = require("../entity/Upload");
const DataItem_1 = require("../entity/DataItem");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "bahhtee",
    password: "baxti7877",
    database: "multisender",
    entities: [Upload_1.Upload, DataItem_1.DataItem],
    synchronize: true,
});
