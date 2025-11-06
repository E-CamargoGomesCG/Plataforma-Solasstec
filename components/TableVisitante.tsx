"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { Visitante } from "../types/visitante";

export default function TableVisitante() {
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchVisitantes() {
    try {
      setLoading(true);
      const res = await api.get("/visitante");
      setVisitantes(res.data);
    } catch (err) {
      console.error("Erro ao buscar visitantes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id: number) {
    if (!confirm("Deseja realmente desativar este visitante?")) return;
    await api.delete(`/visitante/${id}`);
    fetchVisitantes();
  }

  useEffect(() => {
    fetchVisitantes();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Carregando visitantes...</p>;

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        👥 Lista de Visitantes
      </h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Documento</th>
            <th className="p-2 border">Nascimento</th>
            <th className="p-2 border">Ativo</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {visitantes.map((v) => (
            <tr
              key={v.id}
              className={`${!v.ativo ? "bg-gray-50 text-gray-400" : ""}`}
            >
              <td className="border p-2">{v.nome}</td>
              <td className="border p-2">{v.documento}</td>
              <td className="border p-2">
                {new Date(v.data_nascimento).toLocaleDateString("pt-BR")}
              </td>
              <td className="border p-2">{v.ativo ? "✅" : "❌"}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleRemove(v.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Desativar
                </button>
              </td>
            </tr>
          ))}
          {visitantes.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Nenhum visitante cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
