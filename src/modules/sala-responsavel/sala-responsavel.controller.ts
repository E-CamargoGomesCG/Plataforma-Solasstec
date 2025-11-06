import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SalaResponsavelService } from './sala-responsavel.service';
import { CreateSalaResponsavelDto } from './dto/create-sala-responsavel.dto';
import { UpdateSalaResponsavelDto } from './dto/update-sala-responsavel.dto';

@Controller('sala-responsavel')
export class SalaResponsavelController {
  constructor(private readonly service: SalaResponsavelService) {}

  @Post()
  create(@Body() dto: CreateSalaResponsavelDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSalaResponsavelDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
