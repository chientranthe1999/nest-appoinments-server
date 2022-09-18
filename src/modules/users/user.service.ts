import { UserCreateDto } from './dto/user-create.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const [data, count] = await this.repository.findAndCount();
    return {
      data,
      count,
    };
  }

  async findOne(phone: string): Promise<UserEntity | undefined> {
    return await this.repository.findOne({
      where: { phone },
    });
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async create(user: UserCreateDto) {
    const isPhoneExist = await this.repository.findOne({
      where: {
        phone: user.phone,
      },
    });

    if (isPhoneExist)
      throw new HttpException(
        'Số điện thoại đã được sử dụng. Vui lòng sử dụng sđt khác',
        HttpStatus.UNPROCESSABLE_ENTITY
      );

    const hashedPassword = generateHash(user.password);
    user.password = hashedPassword;
    const userCreated = this.repository.create(user);
    return await this.repository.save(userCreated);
  }

  async update(updateData: any, id: number) {
    return await this.repository.update(id, updateData);
  }
}
