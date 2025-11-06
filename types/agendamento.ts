export interface Agendamento {
  id: number;
  visitante: string;
  sala: string;
  data: string;     
  hora: string;      
  status: "PENDENTE" | "CONFIRMADO" | "FINALIZADO";
}
