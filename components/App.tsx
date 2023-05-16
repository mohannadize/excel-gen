"use client";
import React from "react";
import { useState } from "react";
import {
  IconContext,
  Table as TableIcon,
  Broom as ClearIcon,
} from "@phosphor-icons/react";
import ResultViewer from "./ResultViewer";

const sample_text = `
[12/05, 5:05 pm] D M Kamal: حسناء محمد صادق
اصلاح لقطع بوتر العضلة الرافعة للذراع بواسطة ثلاثة خطاطيف 
Double row
د احمد الخطيب
[12/05, 5:07 pm] D M Kamal: بسنت هشام عبد العزيز 
( انثى الفيل )
استعواض للرباط الصليبي الامامي للركبة و تهذيب لقطع بالغضروف الهلالي الداخلي 
د احمد الخطيب
`;

const parseText = (input: string): Entry[] => {
  let parsed: string | string[] = input;
  parsed = parsed.replace(/\t/g, "").trim();
  parsed = parsed.split(/[\[\]]/g);
  parsed.splice(0, 1);
  const result = [];
  {
    let i = 0;
    while (i <= parsed.length - 1) {
      const date = new Date(`
      ${new Date().getFullYear()}-${parsed[i]
        .split(",")[0]
        .split("/")
        .reverse()
        .join("-")}
       18:00:00`)
        .toISOString()
        .split("T")[0];
      const content: string[] = parsed[i + 1]
        .trim()
        .split(":")[1]
        .split("\n")
        .map((line) => line.trim());
      const patientName = content[0];
      const description = content.splice(1, content.length - 2).join("\n");
      const doctorName = content[content.length - 1];
      result.push({
        date,
        patientName,
        description,
        doctorName,
      });
      i += 2;
    }
  }

  return result;
};

export type Entry = {
  date: string;
  patientName: string;
  description: string;
  doctorName: string;
};

export default function App() {
  const [state, setState] = useState<null | Entry[]>(null);
  const [input, setInput] = useState<string>("");

  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: "duotone",
        mirrored: false,
      }}
    >
      <textarea
        value={input}
        placeholder={sample_text
          .trim()
          .split("\n")
          .map((line) => line.trim())
          .join("\n")}
        onChange={({ currentTarget }) => setInput(currentTarget.value)}
        className="textarea textarea-bordered w-1/2 max-w-full"
        rows={10}
      ></textarea>
      <div className="flex gap-2">
        <button
          onClick={() => setState(parseText(input))}
          className="btn gap-2"
        >
          Convert to table
          <TableIcon />
        </button>
        <button
          onClick={() => (setState(null), setInput(""))}
          className={`btn btn-error gap-2 ${state === null ? "hidden" : ""}`}
        >
          Clear
          <ClearIcon />
        </button>
      </div>
      {state && <ResultViewer data={state} />}
    </IconContext.Provider>
  );
}
