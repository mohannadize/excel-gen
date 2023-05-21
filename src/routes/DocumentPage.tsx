import { ArrowLeft, MicrosoftExcelLogo } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import useLocalStorage from "../useLocalStorage";
import { Document, Patient } from "../types";
import { PatientsList } from "../components/PatientsList";
import exportToExcel from "../exportToExcel";

function DocumentPage() {
  const params = useParams();
  const [documents] = useLocalStorage<Document[]>("documents", []);
  const currentDocument = documents.find(document => params.id === document.id)
  const [patients, setPatients] = useLocalStorage<Patient[]>(`document-${currentDocument?.id || "null"}`, [{
    name: "Mohannad",
    desc: `Hotdog otaku engine knife sensory BASE jump denim towards long-chain hydrocarbons footage market sentient post. Assault weathered neural media decay realism bomb grenade wonton soup nodal point face forwards physical motion denim nodality savant papier-mache.

    Free. Corporation uplink shrine kanji tower bicycle military-grade papier-mache rebar. Wristwatch towards man wonton soup RAF construct hacker ablative savant franchise long-chain hydrocarbons. Gang network sensory franchise nodality garage girl realism. `,
    date: "2020-02-20",
    doctor: "Dr. Mohanad",
    addedOn: new Date()
  }]);

  if (!currentDocument) throw new Error();

  function handleExportToExcel() {
    currentDocument && exportToExcel(patients, currentDocument.title);
  }

  return (
    <>
      <div className="p-8">
        <div className="flex gap-4 items-center mb-8 flex-wrap">
          <Link to="/" className="btn gap-4 btn-ghost">
            <span><ArrowLeft /></span>
            <span>Back</span>
          </Link>
          <h1 className='text-3xl font-bold font-main flex-grow'>{currentDocument.title}</h1>
          {!!patients.length && <button onClick={handleExportToExcel} className="btn btn-excel gap-2 btn-sm rounded">
            <span>save excel</span>
            <MicrosoftExcelLogo />
          </button>}
        </div>
        <PatientsList
          onAdd={(patient) => setPatients(patients => ([...patients, patient]))}
          onDelete={(index) => setPatients(patients => {
            const new_patients = [...patients];
            new_patients.splice(index, 1);
            return new_patients;
          })}
          onModify={(index, patient) => setPatients(patients => {
            const new_patients = [...patients];
            new_patients[index] = {
              ...patient
            };
            return new_patients;
          })} patients={patients} />
      </div>
    </>
  );
}

export default DocumentPage;

