import express from "express";
import { sendCSVFileToClient, sendCurrentBalance } from "./controller";

const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).json({ message: "api is working" })
);

router.get("/import", sendCSVFileToClient);
router.get("/current-balance", sendCurrentBalance);

export default router;
