import ExcellentExport from "excellentexport";
import { MicrosoftExcelLogo } from "@phosphor-icons/react";
import type { Entry } from "./App";
import React from "react";

export default function ResultViewer({ data }: { data: Entry[] }) {
  return (
    <>
      <table data-en={window.scrollTo({
        top: document.getElementById("datatable")?.offsetTop || 0 - 60,
        behavior: "smooth"
      })} id="datatable" className="table w-1/2 max-w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient Name</th>
            <th>Description</th>
            <th>Doctor Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i}>
              <td className="text-gray-600 text-sm font-light">{entry.date}</td>
              <td>{entry.patientName}</td>
              <td className="whitespace-pre-wrap">{entry.description}</td>
              <td>{entry.doctorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        className="btn btn-success gap-2"
        download="data.xlsx"
        href="#"
        onClick={({ currentTarget }) =>
          ExcellentExport.convert(
            {
              anchor: currentTarget,
              filename: "patients",
              format: "xlsx",
              rtl: true,
            },
            [{ name: "Sheet 1", from: { table: "datatable" } }]
          )
        }
      >
        Download Excel file
        <MicrosoftExcelLogo />
      </a>
    </>
  );
}
