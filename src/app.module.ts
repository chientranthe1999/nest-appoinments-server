import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entity
import { UserEntity } from './modules/users/user.entity';
import { Appoiments } from './modules/appoinments/appoinment.entity';

// Module
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { AppoinmentModule } from './modules/appoinments/appoinment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'appoinments',
      entities: [UserEntity, Appoiments],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    AppoinmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
