import { Plus, Download, Pencil } from "@phosphor-icons/react";
import { Document, Patient } from "../types";
import { Link } from "react-router-dom";
import useLocalStorage from "../useLocalStorage";
import exportToExcel from "../exportToExcel";

const pluralRules = new Intl.PluralRules('en-US');

export const DocumentCard = ({ document, onDelete }: { document: Document; onDelete: () => void; }) => {
  const [patients] = useLocalStorage<Patient[]>(`document-${document.id}`, []);

  return <div className='shadow bg-base-100 p-4 w-full max-w-screen-sm rounded-xl hover:shadow-md' key={document.id}>
    <div className="flex justify-between mb-2">
      <div className="font-bold text-base-content">{document.title}</div>
      <div>
        <button
          className="btn btn-xs btn-ghost"
          onClick={() => confirm("Delete document? you won't be able to recover the data") && onDelete()}>
          Delete
        </button>
      </div>
    </div>
    {!patients.length && <div className="font-light text-sm">No patients added yet</div>}
    {!!patients.length && <div className="font-light text-sm">{patients.length} patient{pluralRules.select(patients.length) == "one" ? "" : "s"}</div>}
    <div className="flex justify-end gap-2 mt-2">
      {!!patients.length && <><Link to={document.id} className="btn btn-sm gap-2">
        <span>Edit</span>
        <span><Pencil /></span>
      </Link>
        <button onClick={() => {
          exportToExcel(patients, document.title);
        }} className="btn btn-sm btn-ghost gap-2">
          <span>Save Excel</span>
          <span><Download /></span>
        </button></>}
      {!patients.length && <Link to={document.id} className="btn btn-sm btn-primary btn-outline gap-2">
        <span>Add patients</span>
        <span><Plus /></span>
      </Link>}
    </div>
  </div>;
};
