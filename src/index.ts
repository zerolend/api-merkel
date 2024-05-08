import * as http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import nconf from "nconf";
import { getProofs } from "./controller/merkleProof";

const app = express();
const server = new http.Server(app);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
    res.json({
      uptime: process.uptime(),
      online: true,
      message: "fuck off",
    });
  });
  
app.get("/merkleProof",getProofs );

app.set("port", nconf.get("PORT") || 5002);

const port = app.get("port");

server.listen(port, () => console.log(`server started on port ${port}`));
