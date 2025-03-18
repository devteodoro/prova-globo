import { Score } from 'src/movies/entities/score.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'Admin' | 'User';

  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => Score, score => score.user)
  scores: Score[];
}
