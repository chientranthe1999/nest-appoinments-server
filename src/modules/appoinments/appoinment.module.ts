import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppoimentService } from './appoinment.service';
import { AppoimentController } from './appoinment.controller';
import { Appoiments } from './appoinment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appoiments])],
  providers: [AppoimentService],
  controllers: [AppoimentController],
})
export class AppoinmentModule {}
