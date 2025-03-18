import { IsNotEmpty, IsString } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    director: string;

    @IsNotEmpty()
    @IsString()
    genre: string;
}
