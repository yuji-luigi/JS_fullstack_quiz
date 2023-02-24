import path from "path";
import { Request, Response } from "express";
import {
  calculateData,
  getDataByAccounts,
  getDBData,
  readDbFile,
} from "../db/dbFormatter";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const account = {
  main: 1612660,
  sub1: 1612661,
};

interface ErrorResponse {
  message: string;
  status: string;
  error: string;
}

async function sendCSVFileToClient(req: Request, res: Response) {
  try {
    // const { account, currency, date } = req.body;
    const dbData = await getDBData();
    const csvFile = await readDbFile();
    //filter by account
    // const dataByAccount = dbData.filter((row) => row.Conto === account);

    res.header("Content-Type", "text/csv");
    res.attachment("account_statement.csv");
    return res.send(csvFile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.error,
    });
  }
}

export async function sendCurrentBalance(req: Request, res: Response) {
  try {
    // divide accounts
    const dataByAccounts = await getDataByAccounts();
    // calculate as instruction
    const calculatedData = calculateData(dataByAccounts);

    res.status(200).json({
      success: true,
      data: calculatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.error,
      success: false,
    });
  }
}

export { sendCSVFileToClient };
