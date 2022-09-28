import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  user_phone: string;

  @IsNotEmpty()
  user_ccid: string;
}
