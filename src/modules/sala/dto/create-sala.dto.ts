import { IsString, IsInt, IsOptional, IsBoolean, IsJSON } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  nome: string;

  @IsJSON()
  disponibilidade: any; 

  @IsInt()
  capacidade: number;

  @IsOptional()
  @IsInt()
  variacao_capacidade?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
