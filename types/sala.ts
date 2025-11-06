export interface Sala {
  id: number;
  nome: string;
  capacidade: number;
  status: "ATIVA" | "MANUTENÇÃO";
}
