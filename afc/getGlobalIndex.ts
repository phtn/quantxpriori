import axios from "axios";
import cheerio from "cheerio";
import { SetStateAction } from "react";

export default async (callback: React.Dispatch<SetStateAction<any[]>>) => {
  const proxyUrl = "https://api.allorigins.win/get?url=";

  const url = `https://www.bloomberg.com/markets/stocks`;
  const indexCode = [
    "DJIA",
    "S&P 500",
    "NDAQ",
    "NYSE",
    "S&P/TSX",
    "SX5E",
    "UKX",
    "DAX",
    "CAC",
    "IBEX",
    "NKY",
    "TPX",
    "HSI",
    "SHA",
    "AS51",
    "ASIA",
  ];
  try {
    const response = await axios.get(proxyUrl + encodeURIComponent(url));
    const html = response.data.contents;
    const $ = cheerio.load(html);

    const table = $("div.data-tables div.table-container table.data-table");

    const thead = $(table).find("thead tr th");

    const headerLabel: string[] = [];
    thead.each((_i, header) => {
      const theader = $(header).text().trim();
      headerLabel.push(theader);
    });

    // /////////////////////////////////

    const tbody = $(table).find("tbody tr");
    const tableData = [];

    tbody.each((i, row) => {
      const th = $(row).find("th").text().trim();
      const nameArray = th.split("   ");

      const td = $(row).find("td");
      const cellData = [];
      td.each((j, cell) => {
        const value = $(cell).text().trim();

        cellData[headerLabel[j + 1]] = value;
      });
      tableData.push({
        Name: {
          abbrev: nameArray[0],
          full: nameArray[1],
          ticker: indexCode[i],
        },
        ...cellData,
      });
    });

    callback(tableData);
  } catch (e) {
    console.log("Error Fetching Data", e);
  }
};
