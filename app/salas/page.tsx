"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function SalasPage() {
  const [salas, setSalas] = useState([
    { id: 1, nome: "Sala de Reuniões A", capacidade: 12, status: "ATIVA" },
    { id: 2, nome: "Auditório Principal", capacidade: 80, status: "ATIVA" },
    { id: 3, nome: "Laboratório 1", capacidade: 20, status: "MANUTENÇÃO" },
  ]);

  const [form, setForm] = useState({
    nome: "",
    capacidade: "",
    status: "ATIVA",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.nome || !form.capacidade) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    setSalas([
      ...salas,
      {
        id: salas.length + 1,
        nome: form.nome,
        capacidade: Number(form.capacidade),
        status: form.status,
      },
    ]);
    setForm({ nome: "", capacidade: "", status: "ATIVA" });
  };

  const handleDelete = (id: number) => {
    setSalas(salas.filter((s) => s.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          Gerenciamento de Salas
        </h1>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition">
          <FaPlus className="text-sm" /> Nova Sala
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Capacidade</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => (
              <tr
                key={sala.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4">{sala.nome}</td>
                <td className="py-2 px-4">{sala.capacidade}</td>
                <td className="py-2 px-4 font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      sala.status === "ATIVA"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {sala.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center flex justify-center gap-3">
                  <button className="text-gray-700 hover:text-black">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(sala.id)}
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
          Cadastrar Nova Sala
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
            <label className="block text-sm text-gray-600 mb-1">
              Capacidade *
            </label>
            <input
              type="number"
              name="capacidade"
              value={form.capacidade}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="ATIVA">Ativa</option>
              <option value="MANUTENÇÃO">Em Manutenção</option>
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
              onClick={() =>
                setForm({ nome: "", capacidade: "", status: "ATIVA" })
              }
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
