import express from "express";

import morgan from "morgan";
import cors from "cors";
import { default as routes } from "./api/routes";

const app = express();

const PORT = 3555;

app.use(cors());
app.use(morgan("combined"));

// app.get("/", async (req, res) => {
//   // calculate the data according to instruction and put into object.
//   //in frontend dispatch those data and display them on the card.
//   res.json(jsonData);
// });

app.use("/", routes);

app.listen(3555, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
