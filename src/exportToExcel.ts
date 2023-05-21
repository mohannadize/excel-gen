import { Document, Patient } from "./types";

export default async function exportToExcel(data: Patient[], title: Document["title"]) {
  const XLSX = await import("xlsx").then(m => m.default);

  const worksheet = XLSX.utils.json_to_sheet(
    data.map((entry) => {
      // Transforming keys from camelcase to title case
      return {
        Date: entry.date,
        "Patient Name": entry.name,
        "Case Description": entry.desc,
        "Doctor Name": entry.name,
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
  XLSX.writeFile(workbook, `${title.replace(/[\n\r]/g, "")}.xlsx`, { compression: true });
}
