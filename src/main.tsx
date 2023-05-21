import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.tsx'
import DocumentPage from './routes/DocumentPage.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { IconContext } from "@phosphor-icons/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from './components/ErrorPage.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/:id",
    element: <DocumentPage />,
    errorElement: <ErrorPage />
  },
]);

function App() {
  const PwaInstall = lazy(() => import("./components/PwaInstall.tsx"));

  return <React.StrictMode>
    <IconContext.Provider value={{
      size: 18,
      weight: "bold",
    }}>
      <RouterProvider router={router} />
      <Toaster position='bottom-center' />
      <Suspense>
        <PwaInstall icon="/icons/icon-192.png" />
      </Suspense>
    </IconContext.Provider>
  </React.StrictMode>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
