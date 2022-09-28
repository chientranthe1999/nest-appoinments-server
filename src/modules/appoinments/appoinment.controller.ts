import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { AppoimentService } from './appoinment.service';
import { CreateAppointmentDto } from './dto/appointment.dto';

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
  async create(@Body() user: CreateAppointmentDto) {
    return this.service.create(user);
  }

  @Put('accept/:id')
  async accept(@Param('id') id: number, @Body() updateData: any) {
    return this.service.update({ status: 2, ...updateData }, id);
  }

  @Put('cancel/:id')
  async cancel(@Param('id') id: number) {
    return this.service.update({ status: 3 }, id);
  }

  @Put('finish/:id')
  async finish(@Param('id') id: number) {
    return this.service.update({ status: 4 }, id);
  }
}
