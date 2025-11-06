"use client";
import { useState } from "react";
import { FaPlus, FaTrash, FaCalendarAlt } from "react-icons/fa";

export default function FeriadosPage() {
  const [feriados, setFeriados] = useState([
    { id: 1, nome: "Ano Novo", data: "2025-01-01", tipo: "Nacional" },
    { id: 2, nome: "Carnaval", data: "2025-03-03", tipo: "Ponto Facultativo" },
    { id: 3, nome: "Tiradentes", data: "2025-04-21", tipo: "Nacional" },
  ]);

  const [form, setForm] = useState({
    nome: "",
    data: "",
    tipo: "Nacional",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.nome || !form.data) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    setFeriados([
      ...feriados,
      { id: feriados.length + 1, nome: form.nome, data: form.data, tipo: form.tipo },
    ]);
    setForm({ nome: "", data: "", tipo: "Nacional" });
  };

  const handleDelete = (id: number) => {
    setFeriados(feriados.filter((f) => f.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
          <FaCalendarAlt /> Gerenciamento de Feriados
        </h1>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition">
          <FaPlus className="text-sm" /> Novo Feriado
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {feriados.map((feriado) => (
              <tr key={feriado.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{feriado.nome}</td>
                <td className="py-2 px-4">
                  {new Date(feriado.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="py-2 px-4 font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      feriado.tipo === "Nacional"
                        ? "bg-green-100 text-green-700"
                        : feriado.tipo === "Estadual"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {feriado.tipo}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleDelete(feriado.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Cadastrar Novo Feriado
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nome *</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Data *</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tipo</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="Nacional">Nacional</option>
              <option value="Estadual">Estadual</option>
              <option value="Ponto Facultativo">Ponto Facultativo</option>
            </select>
          </div>
          <div className="col-span-3 flex gap-2 items-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cadastrar
            </button>
            <button
              type="button"
              onClick={() => setForm({ nome: "", data: "", tipo: "Nacional" })}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
