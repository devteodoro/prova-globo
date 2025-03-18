import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Score } from './score.entity';

@Entity()
export class Movie {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @OneToMany(() => Score, score => score.movie)
  scores: Score[];
}
