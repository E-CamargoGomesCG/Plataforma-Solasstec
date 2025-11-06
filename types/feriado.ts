export interface Feriado {
  id: number;
  nome: string;
  data: string;   
  tipo: "Nacional" | "Estadual" | "Ponto Facultativo";
}
