export interface Visitante {
  id: number;
  nome: string;
  documento: string;
  data_nascimento: string;
  tipo_prioridade_id?: number | null;
  foto?: string | null;
  ativo?: boolean;
}
