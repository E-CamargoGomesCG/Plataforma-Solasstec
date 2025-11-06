import { IsInt, IsOptional } from 'class-validator';

export class CreateAcessoDto {
  @IsInt()
  visitante_id: number;

  @IsOptional()
  @IsInt()
  sala_id?: number;

  @IsOptional()
  @IsInt()
  agendamento_id?: number;
}
