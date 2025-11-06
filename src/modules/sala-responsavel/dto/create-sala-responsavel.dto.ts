import { IsInt, IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateSalaResponsavelDto {
  @IsOptional()
  @IsInt()
  sala_id?: number;

  @IsString()
  nome: string;

  @IsDateString()
  valido_de: Date;

  @IsOptional()
  @IsDateString()
  valido_ate?: Date;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
