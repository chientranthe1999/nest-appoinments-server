import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { AppoimentService } from './appoinment.service';

@Controller('appoinments')
export class AppoimentController {
  constructor(private readonly service: AppoimentService) {}

  @Get()
  async get() {
    return this.service.get();
  }

  @Get('search')
  async search(@Query('keyword') keyword) {
    return await this.service.search(keyword);
  }

  @Post()
  async create(@Body() user: any) {
    return this.service.create(user);
  }

  @Put('update/:id')
  async active(@Param('id') id: number, @Body() updateData: any) {
    return this.service.update(updateData, id);
  }
}
