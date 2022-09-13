import { UserCreateDto } from './dto/user-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
//------------------------------------------------
import { generateHash } from 'src/utils/auth.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async get() {
    return await this.repository.findAndCount();
  }

  async findOne(phone: string): Promise<UserEntity | undefined> {
    return await this.repository.findOne({
      where: { phone },
    });
  }

  async create(user: UserCreateDto) {
    const hashedPassword = generateHash(user.password);
    user.password = hashedPassword;
    const userCreated = this.repository.create(user);
    return await this.repository.save(userCreated);
  }

  async update(updateData: any, id: number) {
    return await this.repository.update(id, updateData);
  }
}
