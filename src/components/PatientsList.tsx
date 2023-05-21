import { UserPlus } from "@phosphor-icons/react";
import { Patient } from "../types";
import { PatientCard } from "./PatientCard";
import WAParser from "../WAParser";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";

type PateintListProps = {
  patients: Patient[];
  onAdd: (arg: Patient) => void;
  onDelete: (arg: number) => void;
  onModify: (arg1: number, arg2: Patient) => void;
};

export function PatientsList({ patients, onAdd, onDelete, onModify }: PateintListProps) {
  const [newPatient, setNewPatient] = useState<null | Patient>(null);

  async function handleOnAdd(force?: true) {
    setNewPatient({
      name: "",
      addedOn: new Date(),
      date: new Date().toISOString().split("T")[0],
      desc: "",
      doctor: ""
    });

    if (force) return 

    const clipboard = await navigator.clipboard?.readText();
    if (clipboard) {
      const trial = WAParser(clipboard);
      if (trial.length) {
        trial.forEach(patient => onAdd(patient));
        setNewPatient(null);
        return toast.success(<div className="flex items-center gap-2">
          <span className="flex-grow">Added from clipboard</span>
          <button className="btn btn-xs" onClick={async () => {
            navigator.clipboard?.writeText("");
            handleOnAdd(true)
          }}>Add another</button>
        </div>)
      }
    }

  }

  function updateNewPatient(key: keyof Patient, value: string) {
    return setNewPatient(patient => patient && ({ ...patient, [key]: value }));
  }

  return <div className="flex flex-col gap-2 max-w-screen-md w-full">
    {patients.map((patient, index) => <PatientCard
      key={index}
      patient={patient}
      onDelete={() => onDelete(index)}
      onModify={(patient: Patient) => onModify(index, patient)} />)}
    <button onClick={() => handleOnAdd()} className="cursor-pointer transition-all hover:bg-gray-300 focus:bg-gray-300 focus:outline-gray-400 border-gray-400 border-dashed p-6 rounded-xl border-2 gap-2 flex justify-center items-center">
      <span className="text-lg lowercase flex items-center gap-2">
        add patient
        <UserPlus />
      </span>
    </button>
    <AnimatePresence>
      {newPatient && <Modal>
        <h3 className="font-bold text-2xl mb-4">New Patient</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          onAdd(newPatient);
          setNewPatient(null);
        }}>
          <label htmlFor="" className="mb-1 block">Patient Name</label>
          <input autoFocus type="text" className="input input-bordered w-full mb-2" required placeholder='name' value={newPatient.name} onChange={({ target }) => updateNewPatient("name", target.value)} />
          <label htmlFor="" className="mb-1 block">Case Description</label>
          <textarea className="textarea textarea-bordered w-full mb-2" required value={newPatient.desc} onChange={({ target }) => updateNewPatient("desc", target.value)} />
          <label htmlFor="" className="mb-1 block">Date</label>
          <input type="date" className="input input-bordered block w-full mb-2" required value={newPatient.date} onChange={({ target }) => updateNewPatient("date", target.value)} />
          <label htmlFor="" className="mb-1 block">Doctor Name</label>
          <input type="text" className="input input-bordered w-full mb-2" required placeholder='Dr. John Doe' value={newPatient.doctor} onChange={({ target }) => updateNewPatient("doctor", target.value)} />
          <div className="modal-action">
            <button className="btn btn-ghost" type="button" onClick={() => setNewPatient(null)}>Cancel</button>
            <button className="btn btn-accent" type="submit">Add</button>
          </div>
        </form>
      </Modal>}
    </AnimatePresence>
  </div>;
}
