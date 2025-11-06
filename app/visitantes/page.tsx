"use client";

import { useState } from "react";
import FormVisitante from "../../components/FormVisitante";
import TableVisitante from "../../components/TableVisitante";

export default function VisitantesPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          🏛️ Gestão de Visitantes
        </h1>
        <FormVisitante onSave={() => setRefresh(refresh + 1)} />
        <TableVisitante key={refresh} />
      </div>
    </main>
  );
}
