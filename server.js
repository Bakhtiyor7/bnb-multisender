"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// const app: Express = express();
const port = process.env.PORT || 3000;
server_1.default.use(express_1.default.json());
server_1.default.use(express_1.default.urlencoded({ extended: true }));
server_1.default.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
