"use client";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Solasstec - Sistema de Agendamento
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <Link
          href="/visitantes"
          className="bg-white shadow-md hover:bg-blue-50 transition p-6 rounded-lg text-center border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-blue-600 mb-2">👤 Visitantes</h2>
          <p className="text-gray-600 text-sm">
            Cadastrar e gerenciar visitantes.
          </p>
        </Link>

        <Link
          href="/salas"
          className="bg-white shadow-md hover:bg-green-50 transition p-6 rounded-lg text-center border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-green-600 mb-2">🏢 Salas</h2>
          <p className="text-gray-600 text-sm">
            Gerencie salas e horários disponíveis.
          </p>
        </Link>

        <Link
          href="/agendamentos"
          className="bg-white shadow-md hover:bg-purple-50 transition p-6 rounded-lg text-center border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-purple-600 mb-2">📅 Agendamentos</h2>
          <p className="text-gray-600 text-sm">
            Crie e acompanhe agendamentos.
          </p>
        </Link>

        <Link
          href="/feriados"
          className="bg-white shadow-md hover:bg-red-50 transition p-6 rounded-lg text-center border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-red-600 mb-2">🎉 Feriados</h2>
          <p className="text-gray-600 text-sm">
            Cadastre feriados e bloqueie datas.
          </p>
        </Link>
      </div>
    </div>
  );
}
