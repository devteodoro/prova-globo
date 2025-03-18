import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Score{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;
    //@Column()
    //userId: number;

    //@Column()
    //movieId: number;

    @ManyToOne(() => User, user => user.scores)
    user: User;

    @ManyToOne(() => Movie, movie => movie.scores)
    movie: Movie;
}