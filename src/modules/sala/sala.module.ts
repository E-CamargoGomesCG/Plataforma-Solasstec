import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [SalaController],
  providers: [SalaService, PrismaService],
})
export class SalaModule {}
