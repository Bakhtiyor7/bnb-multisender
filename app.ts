import express from "express";
import cors from "cors";
import { AppDataSource } from "./src/config/typeormConfig";
import router from "./src/routes/router";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
console.log("router:", router);
app.use("/api", router);

export default app;
