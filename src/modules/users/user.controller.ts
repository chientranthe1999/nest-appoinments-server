import { UserCreateDto } from './dto/user-create.dto';
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async get() {
    return this.service.get();
  }

  @Post()
  async create(@Body() user: UserCreateDto) {
    return this.service.create(user);
  }

  @Put('active/:id')
  async active(@Param('id') id: number) {
    return this.service.update({ status: 1 }, id);
  }

  @Put('de-active/:id')
  async deActive(@Param('id') id: number) {
    try {
      return this.service.update({ status: 0 }, id);
    } catch (e) {
      return {
        code: 500,
        message: e,
      };
    }
  }
}
