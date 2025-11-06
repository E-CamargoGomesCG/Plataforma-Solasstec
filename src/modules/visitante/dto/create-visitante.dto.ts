import { IsString, IsDateString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateVisitanteDto {
  @IsString()
  nome: string;

  @IsString()
  documento: string;

  @IsDateString()
  data_nascimento: string; 
  @IsOptional()
  @IsInt()
  tipo_prioridade_id?: number;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
