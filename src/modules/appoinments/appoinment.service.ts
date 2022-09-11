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
    return await this.repository.findAndCount();
  }

  async create(appoinment: any) {
    const appoinmentCreated = this.repository.create(appoinment);
    return await this.repository.save(appoinmentCreated);
  }

  async update(updateData: any, id: number) {
    return await this.repository.update({ id }, updateData);
  }

  async search(keyword: string) {
    return await this.repository.findAndCount({
      where: {
        user_ccid: Like(`%${keyword}%`),
      },
    });
  }
}
