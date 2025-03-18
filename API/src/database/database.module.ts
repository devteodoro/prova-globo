import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity'
import { Movie } from '../movies/entities/movie.entity'
import {ConfigModule} from '@nestjs/config';
import { Score } from 'src/movies/entities/score.entity';

@Module({
imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Movie, Score],
        synchronize: true,
    })]
})
export class DatabaseModule {}
