import { IsInt, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class CreateAgendamentoDto {
  @IsInt()
  visitante_id: number;

  @IsOptional()
  @IsInt()
  sala_id?: number;

  @IsDateString()
  data_agendada: Date;

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
