import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(cors());

//tornando pasta uploads acessivel
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

export default app;
