import { Module } from '@nestjs/common';
import { TipoPrioridadeService } from './tipo-prioridade.service';
import { TipoPrioridadeController } from './tipo-prioridade.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [TipoPrioridadeController],
  providers: [TipoPrioridadeService, PrismaService],
})
export class TipoPrioridadeModule {}
