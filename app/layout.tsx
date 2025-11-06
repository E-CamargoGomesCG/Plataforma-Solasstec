import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Solasstec - Sistema de Agendamento",
  description: "Gerencie visitantes, salas, feriados e agendamentos com eficiência.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100 text-gray-800">
        {children}
      </body>
    </html>
  );
}
