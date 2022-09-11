import { UserCreateDto } from './dto/user-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { pick } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async get() {
    return await this.repository.findAndCount();
  }

  async create(user: UserCreateDto) {
    const userCreated = this.repository.create(user);
    return await this.repository.save(userCreated);
  }

  async update(updateData: any, id: number) {
    return await this.repository.update(id, updateData);
  }
}
