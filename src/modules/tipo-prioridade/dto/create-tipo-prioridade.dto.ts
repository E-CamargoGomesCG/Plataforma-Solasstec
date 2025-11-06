import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateTipoPrioridadeDto {
  @IsString()
  descricao: string;

  @IsInt()
  nivel_prioridade: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
