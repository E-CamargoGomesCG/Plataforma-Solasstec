import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAcessoDto } from './dto/create-acesso.dto';
import { UpdateAcessoDto } from './dto/update-acesso.dto';

@Injectable()
export class AcessoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAcessoDto) {
    const acessoAtivo = await this.prisma.acesso.findFirst({
      where: { visitante_id: dto.visitante_id, saida_em: null, ativo: true },
    });

    if (acessoAtivo) {
      throw new BadRequestException('O visitante já possui uma entrada ativa.');
    }

    return this.prisma.acesso.create({
      data: {
        visitante_id: dto.visitante_id,
        sala_id: dto.sala_id,
        agendamento_id: dto.agendamento_id,
        entrada_em: new Date(),
      },
    });
  }

  async update(id: number, dto: UpdateAcessoDto) {
    const acesso = await this.prisma.acesso.findUnique({ where: { id } });

    if (!acesso) throw new NotFoundException('Acesso não encontrado.');

    if (acesso.saida_em) {
      throw new BadRequestException('Saída já foi registrada.');
    }

    return this.prisma.acesso.update({
      where: { id },
      data: { saida_em: new Date(), ...dto },
    });
  }

  async findAll(filtros?: { visitante_id?: number; sala_id?: number; agendamento_id?: number }) {
    return this.prisma.acesso.findMany({
      where: { ativo: true, ...filtros },
      include: { visitante: true, sala: true, agendamento: true },
      orderBy: { entrada_em: 'desc' },
    });
  }

  async findOne(id: number) {
    const acesso = await this.prisma.acesso.findUnique({
      where: { id },
      include: { visitante: true, sala: true, agendamento: true },
    });
    if (!acesso) throw new NotFoundException('Acesso não encontrado.');
    return acesso;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.acesso.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
