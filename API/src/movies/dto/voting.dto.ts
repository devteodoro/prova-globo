import { IsNotEmpty } from "class-validator";

export class VotingDto{
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    movieId: number;
    
    @IsNotEmpty()
    rating: number;
}