import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appoiments } from './appoinment.entity';
import { Like, Repository } from 'typeorm';
import { pick } from 'lodash';

@Injectable()
export class AppoimentService {
  constructor(
    @InjectRepository(Appoiments)
    private readonly repository: Repository<Appoiments>
  ) {}

  async get() {
    const [data, count] = await this.repository.findAndCount();

    return {
      data,
      count,
    };
  }

  async create(appoinment: any) {
    appoinment.accepted_date = appoinment.date;
    appoinment.accepted_time = appoinment.time;

    const appoinmentCreated = this.repository.create(appoinment);
    return await this.repository.save(appoinmentCreated);
  }

  async update(updateData: any, id: number) {
    return await this.repository.update({ id }, updateData);
  }

  async search(keyword: string) {
    const [data, count] = await this.repository.findAndCount({
      where: {
        user_ccid: Like(`%${keyword}%`),
      },
    });

    return {
      data,
      count,
    };
  }
}
