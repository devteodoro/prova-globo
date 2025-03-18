import { Score } from "../entities/score.entity";

export class MovieDto{
    id: number;
    title: string;
    director: string;
    genre: string;
    scores: Score[];
    average: number;
}