import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';

@Injectable()
export class VisitanteService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVisitanteDto) {
    const documentoExiste = await this.prisma.visitante.findUnique({
      where: { documento: data.documento },
    });
    if (documentoExiste) {
      throw new BadRequestException('Documento já cadastrado.');
    }

    const dataNascimento = data.data_nascimento
      ? new Date(data.data_nascimento)
      : undefined;

    const idade = dataNascimento
      ? new Date().getFullYear() - dataNascimento.getFullYear()
      : 0;

    let tipoPrioridadeId = data.tipo_prioridade_id;
    if (idade >= 60 && !tipoPrioridadeId) {
      tipoPrioridadeId = 1; 
    }

return this.prisma.visitante.create({
  data: {
    nome: data.nome,
    documento: data.documento,
    data_nascimento: dataNascimento ?? new Date(), 
    tipo_prioridade_id: tipoPrioridadeId,
    foto: data.foto,
    ativo: data.ativo ?? true,
  },
});
  }

  async findAll() {
    return this.prisma.visitante.findMany({
      include: { tipo_prioridade: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const visitante = await this.prisma.visitante.findUnique({
      where: { id },
      include: { tipo_prioridade: true, agendamento: true, acesso: true },
    });

    if (!visitante) throw new NotFoundException('Visitante não encontrado.');
    return visitante;
  }

  async update(id: number, data: UpdateVisitanteDto) {
    await this.findOne(id);

    if (data.documento) {
      const existe = await this.prisma.visitante.findFirst({
        where: { documento: data.documento, NOT: { id } },
      });
      if (existe) throw new BadRequestException('Documento já está em uso.');
    }

    const dataNascimento = data.data_nascimento
      ? new Date(data.data_nascimento)
      : undefined;

    const idade = dataNascimento
      ? new Date().getFullYear() - dataNascimento.getFullYear()
      : 0;

    let tipoPrioridadeId = data.tipo_prioridade_id;
    if (idade >= 60 && !tipoPrioridadeId) {
      tipoPrioridadeId = 1;
    }

    return this.prisma.visitante.update({
      where: { id },
      data: {
        nome: data.nome,
        documento: data.documento,
        ...(dataNascimento && { data_nascimento: dataNascimento }), 
        tipo_prioridade_id: tipoPrioridadeId,
        foto: data.foto,
        ativo: data.ativo,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.visitante.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
