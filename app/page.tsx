import App from "@/components/App";

export default function Home() {
  return (
    <main className="p-24 w-screen min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="prose text-center">
        <h1>Paste your text below</h1>
      </div>
      <App />
    </main>
  );
}
