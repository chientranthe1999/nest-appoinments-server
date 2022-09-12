import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  name: string;

  address: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
