import { Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserCreateDto {
  name: string;

  address: string;

  phone: string;

  email: string;
}
