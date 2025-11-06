import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TipoPrioridadeService } from './tipo-prioridade.service';
import { CreateTipoPrioridadeDto } from './dto/create-tipo-prioridade.dto';
import { UpdateTipoPrioridadeDto } from './dto/update-tipo-prioridade.dto';

@Controller('tipo-prioridade')
export class TipoPrioridadeController {
  constructor(private readonly service: TipoPrioridadeService) {}

  @Post()
  create(@Body() dto: CreateTipoPrioridadeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTipoPrioridadeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
