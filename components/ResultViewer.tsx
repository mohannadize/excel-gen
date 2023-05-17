"use client";
import * as XLSX from "xlsx";
import { MicrosoftExcelLogo } from "@phosphor-icons/react";
import type { Entry } from "./App";
import React, { useEffect, useRef } from "react";

export default function ResultViewer({ data }: { data: Entry[] }) {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (downloadRef.current) {
      downloadRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    setTimeout(() => {
    }, 300);
  }, [downloadRef.current]);

  return (
    <>
      <div className="overflow-scroll lg:w-1/2 max-w-full">
        <table id="datatable" className="table table-compact">
          <thead>
            <tr>
              <th
                style={{
                  position: "relative",
                }}
              >
                Date
              </th>
              <th>Patient Name</th>
              <th>Description</th>
              <th>Doctor Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={i}>
                <td className="text-gray-600 text-sm font-light">
                  {entry.date}
                </td>
                <td>{entry.patientName}</td>
                <td className="whitespace-pre-wrap">{entry.description}</td>
                <td>{entry.doctorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a
        ref={downloadRef}
        className="btn btn-success gap-2"
        download="data.xlsx"
        onClick={() => {
          const worksheet = XLSX.utils.json_to_sheet(
            data.map((entry) => {
              // Transforming keys from camelcase to title case
              return {
                Date: entry.date,
                "Patient Name": entry.patientName,
                "Case Description": entry.description,
                "Doctor Name": entry.doctorName,
              };
            })
          );
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
          worksheet["!cols"] = [
            {
              wch: 10,
            },
            {
              wch: 16,
            },
            {
              wch: 50,
            },
            {
              wch: 16,
            },
          ];
          worksheet["!rows"] = [
            {},
            ...data.map(() => ({
              hpt: 40,
            })),
          ];
          XLSX.writeFile(workbook, "Patients.xlsx", { compression: true });
        }}
      >
        Download Excel file
        <MicrosoftExcelLogo />
      </a>
    </>
  );
}
