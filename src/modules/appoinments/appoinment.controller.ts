import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { AppoimentService } from './appoinment.service';
import { Appoiments } from './appoinment.entity';

@Controller('appoinments')
export class AppoimentController {
  constructor(private readonly service: AppoimentService) {}
  // đối tượng userservice // biến, phương thức

  @Get()
  async get() {
    return this.service.get();
  }

  @Get('search')
  async search(@Query('keyword') keyword) {
    console.log(keyword);
    return await this.service.search(keyword);
  }

  @Post()
  async create(@Body() user: any) {
    return this.service.create(user);
  }

  @Put('update/:id')
  async active(@Param('id') id: number, @Body() updateData: any) {
    console.log(updateData);
    return this.service.update(updateData, id);
  }
}
