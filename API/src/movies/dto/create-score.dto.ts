import { IsNotEmpty } from "class-validator";

export class CreateScoreDto {
    @IsNotEmpty()
    rating: number;
}