import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateSalaResponsavelDto } from './dto/create-sala-responsavel.dto';
import { UpdateSalaResponsavelDto } from './dto/update-sala-responsavel.dto';

@Injectable()
export class SalaResponsavelService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSalaResponsavelDto) {
    if (data.valido_ate && new Date(data.valido_ate) < new Date(data.valido_de)) {
      throw new BadRequestException('A data final não pode ser anterior à data inicial.');
    }

    return this.prisma.sala_responsavel.create({ data });
  }

  async findAll() {
    return this.prisma.sala_responsavel.findMany({
      where: { ativo: true },
      include: { sala: true },
      orderBy: [{ valido_de: 'asc' }, { nome: 'asc' }],
    });
  }

  async findOne(id: number) {
    const responsavel = await this.prisma.sala_responsavel.findUnique({
      where: { id },
      include: { sala: true },
    });

    if (!responsavel) throw new NotFoundException('Responsável não encontrado.');
    return responsavel;
  }

  async update(id: number, data: UpdateSalaResponsavelDto) {
    await this.findOne(id);

    if (data.valido_ate && data.valido_de && new Date(data.valido_ate) < new Date(data.valido_de)) {
      throw new BadRequestException('A data final não pode ser anterior à data inicial.');
    }

    return this.prisma.sala_responsavel.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sala_responsavel.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
