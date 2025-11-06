import { IsDateString, IsNotEmpty, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateFeriadoDto {
  @IsDateString()
  data: Date;

  @IsNotEmpty()
  descricao: string;

  @IsOptional()
  @IsInt()
  tipo?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
