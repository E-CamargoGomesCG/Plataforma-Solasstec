import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

@Injectable()
export class AgendamentoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAgendamentoDto) {
    const visitante = await this.prisma.visitante.findUnique({
      where: { id: data.visitante_id },
    });
    if (!visitante || !visitante.ativo)
      throw new BadRequestException('Visitante inativo ou não encontrado.');

    if (data.sala_id) {
      const sala = await this.prisma.sala.findUnique({
        where: { id: data.sala_id },
      });
      if (!sala || !sala.ativo)
        throw new BadRequestException('Sala inativa ou inexistente.');
    }

    const conflito = await this.prisma.agendamento.findFirst({
      where: {
        visitante_id: data.visitante_id,
        data_agendada: new Date(data.data_agendada),
        ativo: true,
      },
    });
    if (conflito)
      throw new BadRequestException('O visitante já possui um agendamento neste horário.');

    const feriado = await this.prisma.feriado.findFirst({
      where: { data: new Date(data.data_agendada), ativo: true },
    });
    if (feriado)
      throw new BadRequestException('Não é possível agendar em feriado.');

    return this.prisma.agendamento.create({ data });
  }

  async findAll() {
    return this.prisma.agendamento.findMany({
      where: { ativo: true },
      include: { visitante: true, sala: true },
      orderBy: { data_agendada: 'asc' },
    });
  }

  async findOne(id: number) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: { visitante: true, sala: true },
    });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
    return agendamento;
  }

  async findByVisitante(idVisitante: number) {
    return this.prisma.agendamento.findMany({
      where: { visitante_id: idVisitante, ativo: true },
      include: { sala: true },
      orderBy: { data_agendada: 'desc' },
    });
  }

  async update(id: number, data: UpdateAgendamentoDto) {
    await this.findOne(id);

    if (data.data_agendada) {
      const feriado = await this.prisma.feriado.findFirst({
        where: { data: new Date(data.data_agendada), ativo: true },
      });
      if (feriado)
        throw new BadRequestException('Data inválida: feriado.');
    }

    return this.prisma.agendamento.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.agendamento.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
