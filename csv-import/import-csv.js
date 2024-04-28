import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("tasks.csv", import.meta.url).pathname;

const csvParser = fs.createReadStream(csvPath).pipe(
  parse({
    from_line: 2,
  })
);

const importCsv = async () => {
  for await (const [title, description] of csvParser) {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
};

importCsv();
