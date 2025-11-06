import { PartialType } from '@nestjs/mapped-types';
import { CreateSalaResponsavelDto } from './create-sala-responsavel.dto';

export class UpdateSalaResponsavelDto extends PartialType(CreateSalaResponsavelDto) {}
