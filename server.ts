import * as dotenv from "dotenv";
import http from "http";
import app from "./app";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
// const app: Express = express();
const port = process.env.PORT || 3001;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
