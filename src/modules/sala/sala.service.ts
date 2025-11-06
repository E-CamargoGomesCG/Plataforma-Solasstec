import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSalaDto) {
    const existe = await this.prisma.sala.findFirst({
      where: { nome: data.nome },
    });
    if (existe) {
      throw new BadRequestException('Já existe uma sala com esse nome.');
    }

    if (!data.variacao_capacidade) {
      data.variacao_capacidade = 2; 
    }

    return this.prisma.sala.create({ data });
  }

  async findAll() {
    return this.prisma.sala.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number) {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
      include: { agendamento: true, acesso: true, sala_responsavel: true },
    });

    if (!sala) throw new NotFoundException('Sala não encontrada.');
    return sala;
  }

  async update(id: number, data: UpdateSalaDto) {
    await this.findOne(id);

    if (data.nome) {
      const existe = await this.prisma.sala.findFirst({
        where: { nome: data.nome, NOT: { id } },
      });
      if (existe) {
        throw new BadRequestException('Já existe uma sala com esse nome.');
      }
    }

    return this.prisma.sala.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.sala.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
