import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// ---------------------------------------------
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
