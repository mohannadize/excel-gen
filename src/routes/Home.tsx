import { useState } from 'react';
import { Plus } from "@phosphor-icons/react"
import { AnimatePresence } from "framer-motion";
import { v4 } from "uuid";
import Modal from '../components/Modal';
import { DocumentCard } from '../components/DocumentCard';
import { Document } from '../types';
import useLocalStorage, { deteleLocalStorage } from '../useLocalStorage';

export default function Home() {
  const [documents, setDocuments] = useLocalStorage<Document[]>("documents", []);
  const [newDocumentTitle, setNewDocumentTitle] = useState<null | string>(null);

  return (
    <div className="p-8">
      <div className="flex gap-4 items-center mb-8">
        <h1 className='text-3xl font-bold font-main'>Your documents</h1>
        <button onClick={() => setNewDocumentTitle("")} className="btn btn-accent btn-sm gap-2">
          <span>New</span>
          <span><Plus /></span>
        </button>
      </div>
      <main className='flex flex-col gap-2 items-start'>
        {documents.map((document, index) => (<DocumentCard document={document} onDelete={() => {
          setDocuments(documents => {
            const new_documents = [...documents];
            const deleted = new_documents.splice(index, 1);
            deteleLocalStorage(`document-${deleted[0].id}`);
            return new_documents;
          });
        }} key={document.id} />))}
        {!documents.length && <p className='text-sm font-light italic'>You do not have any documents yet.</p>}
      </main>
      <AnimatePresence>
        {typeof newDocumentTitle == "string" && <Modal>
          <h3 className="font-bold text-2xl mb-4">New Document</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            setDocuments(documents => ([...documents, {
              id: v4(),
              title: newDocumentTitle,
              createdAt: new Date(),
            }]))
            setNewDocumentTitle(null);
          }}>
            <input autoFocus required type="text" className="input input-bordered w-full" placeholder='Document title' value={newDocumentTitle} onChange={({ target }) => setNewDocumentTitle(target.value)} />
            <div className="modal-action">
              <button className="btn btn-accent" type="submit">Create</button>
              <button className="btn btn-ghost" type='button' onClick={() => setNewDocumentTitle(null)}>Cancel</button>
            </div>
          </form>
        </Modal>}
      </AnimatePresence>
    </div>
  );
};