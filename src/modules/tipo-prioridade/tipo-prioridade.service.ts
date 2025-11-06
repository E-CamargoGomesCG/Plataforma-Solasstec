import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTipoPrioridadeDto } from './dto/create-tipo-prioridade.dto';
import { UpdateTipoPrioridadeDto } from './dto/update-tipo-prioridade.dto';

@Injectable()
export class TipoPrioridadeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTipoPrioridadeDto) {
    const existe = await this.prisma.tipo_prioridade.findFirst({
      where: { descricao: data.descricao },
    });

    if (existe) {
      throw new BadRequestException('Tipo de prioridade já cadastrado.');
    }

    return this.prisma.tipo_prioridade.create({ data });
  }

  async findAll() {
    return this.prisma.tipo_prioridade.findMany({
      where: { ativo: true },
      orderBy: { nivel_prioridade: 'asc' },
    });
  }

  async findOne(id: number) {
    const tipo = await this.prisma.tipo_prioridade.findUnique({
      where: { id },
      include: { visitante: true },
    });

    if (!tipo) throw new NotFoundException('Tipo de prioridade não encontrado.');
    return tipo;
  }

  async update(id: number, data: UpdateTipoPrioridadeDto) {
    await this.findOne(id);

    if (data.descricao) {
      const existe = await this.prisma.tipo_prioridade.findFirst({
        where: { descricao: data.descricao, NOT: { id } },
      });
      if (existe) {
        throw new BadRequestException('Descrição já está em uso.');
      }
    }

    return this.prisma.tipo_prioridade.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tipo_prioridade.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
