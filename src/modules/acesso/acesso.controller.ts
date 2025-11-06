import { Controller, Post, Get, Patch, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { CreateAcessoDto } from './dto/create-acesso.dto';
import { UpdateAcessoDto } from './dto/update-acesso.dto';

@Controller('acesso')
export class AcessoController {
  constructor(private readonly service: AcessoService) {}

  @Post()
  create(@Body() dto: CreateAcessoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('visitante_id') visitante_id?: number,
    @Query('sala_id') sala_id?: number,
    @Query('agendamento_id') agendamento_id?: number,
  ) {
    return this.service.findAll({
      visitante_id: visitante_id ? Number(visitante_id) : undefined,
      sala_id: sala_id ? Number(sala_id) : undefined,
      agendamento_id: agendamento_id ? Number(agendamento_id) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAcessoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
