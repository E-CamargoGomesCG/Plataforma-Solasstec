import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { VisitanteService } from './visitante.service';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';

@Controller('visitante')
export class VisitanteController {
  constructor(private readonly visitanteService: VisitanteService) {}

  @Post()
  create(@Body() data: CreateVisitanteDto) {
    return this.visitanteService.create(data);
  }

  @Get()
  findAll() {
    return this.visitanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitanteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateVisitanteDto) {
    return this.visitanteService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitanteService.remove(id);
  }
}
