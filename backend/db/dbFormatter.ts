import path from "path";
import csvToJson from "csvtojson/v2";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const accountStatementFilePath = path.resolve(
  __dirname,
  "account_statement.csv"
);

const jsonData = await csvToJson().fromFile(accountStatementFilePath);

interface AccountStatementInterface {
  Conto: string | number;
  "Numero ordine": number | string;
  "Descrizione operazione": string;
  Tipo: TipoTypesLol;
  ISIN: "USD" | "EUR" | string;
  "Circuito Pagamento": string;
  Quantità: number | string;
  Prezzo?: number | string | undefined;
  Divisa: "USD" | "EUR";
  "Importo lordo": number | string;
  Imposte?: number | string | undefined;
  Commissioni?: number | string | undefined;
  "Valore netto"?: number | string;
}

type TipoTypesLol = "Versamento" | "Prelievo" | "Acquisto" | "Vendita";

export const getDBData = async () =>
  await csvToJson().fromFile(accountStatementFilePath);

export function queryDB(query: { date?: Date; currency?: "USD" | "EUR" }) {}

export async function readDbFile() {
  return await fs.readFile(accountStatementFilePath);
}

// object version
export async function getDataByAccounts() {
  const data = await getDBData();

  const groupedData = data.reduce((all, cur) => {
    if (all[cur.Conto]) {
      all[cur.Conto].push(cur);
      return all;
    }
    all[cur.Conto] = [cur];
    return all;
  }, {});

  return groupedData;
}

// array version
export async function getDataByAccountsArray() {
  const data = await getDBData();

  // const groupedData = data.map(row) => {

  // return groupedData;
}

interface Data {
  [key: string]: AccountStatementInterface[];
}
interface ReturnData {
  [key: string]: {
    /** key is also account number. just in case. */
    accountNumber: number;
    total: {
      EUR: number;
      USD: number;
    };
  };
}
/**
 *
 * @param groupedData
 * @returns {ReturnData}
 */
export function calculateData(groupedData: Data) {
  const accounts = Object.keys(groupedData);
  const totalAccountData = accounts.reduce<ReturnData>((obj, cur) => {
    obj[cur] = { total: { EUR: 0, USD: 0 }, accountNumber: +cur };
    return obj;
  }, {});
  //initialize object

  // need to loop by accounts
  for (const key in groupedData) {
    const oneAccountTransactions = groupedData[key];
    // now need to calculate all the values
    // o(n)²...
    oneAccountTransactions.forEach((transAction) => {
      const currentAccountData = totalAccountData[key];
      const CUR = transAction.Divisa; // currency used
      let accountTotal = currentAccountData.total;

      if (transAction.Tipo === "Versamento" || transAction.Tipo === "Vendita") {
        // total balance of one currency of one account
        // console.log(+transAction.Quantità);
        // console.log(+transAction["Quantità"]);
        accountTotal[CUR] = accountTotal[CUR] + +transAction["Valore netto"];
        console.log(accountTotal[CUR]);
        // let totalDeposit = +transAction.Prezzo * +transAction["Quantità"];
        // totalDeposit = transAction.Commissioni
        //   ? totalDeposit - +transAction.Commissioni
        //   : totalDeposit;
        // totalDeposit = transAction.Imposte
        //   ? totalDeposit - +transAction.Imposte
        //   : totalDeposit;
        // accountTotal[CUR] = accountTotal[CUR] + totalDeposit;
      }
      if (transAction.Tipo === "Prelievo" || transAction.Tipo === "Acquisto") {
        accountTotal[CUR] = accountTotal[CUR] - +transAction["Valore netto"];
        console.log(accountTotal[CUR]);
      }
    });
  }

  const array = [];
  for (const account in totalAccountData) {
    array.push(totalAccountData[account]);
  }

  return array;
}
