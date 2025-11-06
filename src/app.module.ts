import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';

import { VisitanteModule } from './modules/visitante/visitante.module';
import { TipoPrioridadeModule } from './modules/tipo-prioridade/tipo-prioridade.module';
import { SalaModule } from './modules/sala/sala.module';
import { SalaResponsavelModule } from './modules/sala-responsavel/sala-responsavel.module';
import { FeriadoModule } from './modules/feriado/feriado.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';
import { AcessoModule } from './modules/acesso/acesso.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    VisitanteModule,
    TipoPrioridadeModule,
    SalaModule,
    SalaResponsavelModule,
    FeriadoModule,
    AgendamentoModule,
    AcessoModule,
  ],
})
export class AppModule {}
