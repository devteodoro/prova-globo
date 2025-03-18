import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule, 
    UsersModule, 
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    MoviesModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
