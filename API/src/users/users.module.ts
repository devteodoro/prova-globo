import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CryptographyModule} from '../Commom/cryptography/cryptography.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]), 
    CryptographyModule,
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule, UsersService]
})
export class UsersModule {}
