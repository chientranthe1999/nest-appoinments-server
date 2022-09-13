import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { validateHash } from '../../utils/auth.util';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  generateToken(userId: number, role: number): Promise<any> {
    return this.jwtService.signAsync({
      id: userId,
      role,
    });
  }

  async login(phone: string, password: string) {
    const user = await this.userService.findOne(phone);

    if (!user && !user.status) {
      return false;
    }

    const isValid = validateHash(password, user.password);

    if (!isValid) return false;

    return this.generateToken(user.id, user.role);
  }
}
