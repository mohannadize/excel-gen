"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  IconContext,
  Table as TableIcon,
  ClipboardText as PasteIcon,
  Broom as ClearIcon,
} from "@phosphor-icons/react";
import ResultViewer from "./ResultViewer";
import "@khmyznikov/pwa-install";
//@ts-ignore
const PwaInstall = (props) => <pwa-install {...props}></pwa-install>;

const sample_text = `
[12/05, 5:05 pm] Contact Name: Patient Name
Lorem ipsum dolor sit amet consectetur adipisicing elit. Non adipisci nemo rem reiciendis optio omnis fuga, voluptate corrupti ex quibusdam?
Doctor Name
`;

function isValidDateObject(date: Date) {
  return date instanceof Date && !isNaN(date.getTime());
}

const parseText = (input: string): Entry[] | null => {
  try {
    let parsed: string | string[] = input;
    parsed = parsed.replace(/\t/g, "").trim();
    parsed = parsed.split(/[\[\]]/g);
    parsed.splice(0, 1);
    const result = [];
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
  } catch (error) {
    toast.error("You have an error in your input");
    return null;
  }
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
  const [isRunningClient, setRunningClient] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      setRunningClient(true);
      navigator.serviceWorker.register("./sw.js");
    }
  }, []);

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
        onClick={({ detail }) => detail === 2 && setInput(sample_text.trim())}
        className="textarea textarea-bordered w-full md:w-4/5 lg:w-1/2 max-w-full"
        rows={10}
      ></textarea>
      <div className={`swap ${state === null ? "" : "swap-active"}`}>
        <div className="swap-off flex flex-row gap-4">
          {isRunningClient && navigator?.clipboard && (
            <button
              onClick={() =>
                navigator.clipboard
                  .readText()
                  .then((clipText) => setInput(clipText))
              }
              className="btn btn-primary gap-2"
            >
              Paste
              <PasteIcon />
            </button>
          )}
          <button
            onClick={() => setState(parseText(input))}
            className="btn gap-2"
          >
            Convert to table
            <TableIcon />
          </button>
        </div>
        <button
          onClick={() => (setState(null), setInput(""))}
          className="btn btn-error gap-2 swap-on"
        >
          Start again
          <ClearIcon />
        </button>
      </div>
      {state && <ResultViewer data={state} />}
      <Toaster position="bottom-center" />
      <PwaInstall icon="/icons/icon-512.png" />
    </IconContext.Provider>
  );
}
