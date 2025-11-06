import { Module } from '@nestjs/common';
import { SalaResponsavelService } from './sala-responsavel.service';
import { SalaResponsavelController } from './sala-responsavel.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [SalaResponsavelController],
  providers: [SalaResponsavelService, PrismaService],
})
export class SalaResponsavelModule {}
