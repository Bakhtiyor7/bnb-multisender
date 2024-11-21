import express from "express";
import cors from "cors";
import { AppDataSource } from "./src/config/typeormConfig";
import router from "./src/routes/router";
import * as bodyParser from "body-parser";
const app = express();
import listEndpoints from "express-list-endpoints";

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
AppDataSource.initialize()
  .then(() => {
    console.log(
      `Database connected successfully: ${AppDataSource.options.type} database at ${AppDataSource.options.database}`,
    );
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
// app.ts
app.get("/api/test", (req, res) => {
  res.send("Test route is working!");
});
app.use("/api", router);
export default app;
