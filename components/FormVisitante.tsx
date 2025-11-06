"use client";

import { useState } from "react";
import api from "../lib/api";
import { Visitante } from "../types/visitante";

export default function FormVisitante({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState<Partial<Visitante>>({
    nome: "",
    documento: "",
    data_nascimento: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nome || !form.documento || !form.data_nascimento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        ativo: true,
        data_nascimento: new Date(form.data_nascimento).toISOString(),
      };

      await api.post("/visitante", payload);
      alert("✅ Visitante cadastrado com sucesso!");
      setForm({ nome: "", documento: "", data_nascimento: "" });
      onSave();
    } catch (err: any) {
      alert("❌ " + (err.response?.data?.message || "Erro ao salvar visitante"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-10"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        🧾 Cadastro de Visitante
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nome completo</label>
          <input
            type="text"
            placeholder="Ex: João da Silva"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Documento</label>
          <input
            type="text"
            placeholder="CPF ou RG"
            value={form.documento}
            onChange={(e) => setForm({ ...form, documento: e.target.value })}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Data de nascimento</label>
          <input
            type="date"
            value={form.data_nascimento}
            onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 outline-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-5 px-5 py-2 rounded-md text-white font-medium transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Salvando..." : "Salvar Visitante"}
      </button>
    </form>
  );
}
