"use client";
import { useState } from "react";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      visitante: "João Silva",
      sala: "Sala de Reuniões A",
      data: "14/01/2025",
      hora: "10:00",
      status: "CONFIRMADO",
    },
    {
      id: 2,
      visitante: "Maria Santos",
      sala: "Auditório Principal",
      data: "15/01/2025",
      hora: "14:00",
      status: "PENDENTE",
    },
    {
      id: 3,
      visitante: "Pedro Oliveira",
      sala: "Sala de Treinamento",
      data: "13/01/2025",
      hora: "09:00",
      status: "FINALIZADO",
    },
  ]);

  const [form, setForm] = useState({
    visitante: "",
    sala: "",
    data: "",
    horaInicio: "",
    horaFim: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.visitante || !form.sala) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    setAgendamentos([
      ...agendamentos,
      {
        id: agendamentos.length + 1,
        visitante: form.visitante,
        sala: form.sala,
        data: form.data,
        hora: form.horaInicio,
        status: "PENDENTE",
      },
    ]);
    setForm({ visitante: "", sala: "", data: "", horaInicio: "", horaFim: "" });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          Lista de Agendamentos
        </h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <FaPlus /> Novo Agendamento
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Visitante</th>
              <th className="py-3 px-4 text-left">Sala</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">Horário</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((ag) => (
              <tr key={ag.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{ag.visitante}</td>
                <td className="py-2 px-4">{ag.sala}</td>
                <td className="py-2 px-4">{ag.data}</td>
                <td className="py-2 px-4">{ag.hora}</td>
                <td className="py-2 px-4 font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      ag.status === "CONFIRMADO"
                        ? "bg-green-100 text-green-700"
                        : ag.status === "PENDENTE"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {ag.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </button>
                  <button className="text-gray-700 hover:text-black">
                    <FaEdit />
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
          Novo Agendamento
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Visitante *</label>
            <input
              type="text"
              name="visitante"
              value={form.visitante}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Sala *</label>
            <input
              type="text"
              name="sala"
              value={form.sala}
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
            <label className="block text-sm text-gray-600 mb-1">Hora Início *</label>
            <input
              type="time"
              name="horaInicio"
              value={form.horaInicio}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Hora Fim *</label>
            <input
              type="time"
              name="horaFim"
              value={form.horaFim}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex gap-2 items-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Agendar
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({
                  visitante: "",
                  sala: "",
                  data: "",
                  horaInicio: "",
                  horaFim: "",
                })
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
