import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPrioridadeDto } from './create-tipo-prioridade.dto';

export class UpdateTipoPrioridadeDto extends PartialType(CreateTipoPrioridadeDto) {}
