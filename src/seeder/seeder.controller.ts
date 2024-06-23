import { Controller, Get, Param } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}
  @Get()
  findAll() {
    return this.seederService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seederService.findOne(+id);
  }
}
