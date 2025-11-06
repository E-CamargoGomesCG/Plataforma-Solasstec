import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';

@Injectable()
export class FeriadoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFeriadoDto) {
    const existe = await this.prisma.feriado.findUnique({
      where: { data: new Date(data.data) },
    });
    if (existe) throw new BadRequestException('Já existe um feriado nesta data.');

    return this.prisma.feriado.create({ data });
  }

  async findAll() {
    return this.prisma.feriado.findMany({
      where: { ativo: true },
      orderBy: { data: 'asc' },
    });
  }

  async findOne(id: number) {
    const feriado = await this.prisma.feriado.findUnique({ where: { id } });
    if (!feriado) throw new NotFoundException('Feriado não encontrado.');
    return feriado;
  }

  async update(id: number, data: UpdateFeriadoDto) {
    await this.findOne(id);

    if (data.data) {
      const existe = await this.prisma.feriado.findFirst({
        where: { data: new Date(data.data), NOT: { id } },
      });
      if (existe)
        throw new BadRequestException('Já existe outro feriado com esta data.');
    }

    return this.prisma.feriado.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.feriado.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
