/*

navigator.clipboard
                  .readText()
                  .then((clipText) => setInput(clipText))

                  */

import { Patient } from "./types";

export default function WAParser (input: string): Patient[] {
  try {
    let parsed: string | string[] = input;
    parsed = parsed.replace(/\t/g, "").trim();
    parsed = parsed.split(/[\[\]]/g);
    parsed.splice(0, 1);
    const result: Patient[] = [];
    {
      let i = 0;
      while (i <= parsed.length - 1) {
        let date: Date | string = new Date(`
      ${new Date().getFullYear()}-${parsed[i]
          .split(",")[0]
          .split("/")
          .reverse()
          .join("-")}
       18:00:00`);
        date = isValidDateObject(date)
          ? date.toISOString().split("T")[0]
          : "error";
        const content: string[] = parsed[i + 1]
          .trim()
          .split(":")[1]
          .split("\n")
          .map((line) => line.trim());
        const name = content[0];
        const desc = content.splice(1, content.length - 2).join("\n");
        const doctor = content[content.length - 1];
        result.push({
          date,
          name,
          desc,
          doctor,
          addedOn: new Date()
        });
        i += 2;
      }
    }

    return result;
  } catch (error) {
    return [];
  }
};


export function isValidDateObject(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}