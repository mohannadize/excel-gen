import { useEffect, useRef } from "react";
import { Patient } from "../types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { isValidDateObject } from "../WAParser";

export function PatientCard({ patient, onDelete, onModify }: { patient: Patient; onDelete: () => void; onModify: (arg: Patient) => void; }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {

    if (textareaRef.current) {
      const t = textareaRef.current;
      t.style.height = "";
      t.style.height = t.scrollHeight + "px";
    }
  }, [textareaRef, patient.desc])

  return <div className="border-gray-300 bg-base-100 p-6 rounded-xl border-2 gap-2 flex">
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <input value={patient.name} className="bg-transparent mb-2 text-lg font-bold font-sans focus:outline-base-300 outline-offset-4 w-fit" onChange={({ target }) => onModify({ ...patient, name: target.value })} />
        <button
          className="btn btn-xs btn-ghost"
          onClick={() => confirm("Delete patient? you won't be able to recover the data") && onDelete()}>
          Delete
        </button>
      </div>
      <textarea
        ref={textareaRef}
        onChange={({ target }) => {
          onModify({ ...patient, desc: target.value || "" });
        }} className="bg-transparent font-serif focus:outline-base-300 outline-offset-4 whitespace-pre-line block resize-none" value={patient.desc} />
      <div className="flex w-full justify-between items-center mt-4">
        <DatePicker placeholderText="Date error" className={
          `w-24 bg-transparent ${isValidDateObject(new Date(patient.date)) ? "text-base-content" : "border-2 rounded border-error px-2"} pt-2 font-sans lowercase text-sm`
        } selected={isValidDateObject(new Date(patient.date)) && new Date(patient.date) || null} onChange={(date) => onModify({ ...patient, date: date?.toISOString().split("T")[0] || "" })} />
        <input className="bg-transparent w-fit font-bold focus:outline-base-300 outline-offset-4 text-right" onChange={({ target }) => onModify({ ...patient, doctor: target.value || "" })} value={patient.doctor} style={{ width: patient.doctor.length + "ch" }} />
      </div>
    </div>
  </div>;
}
