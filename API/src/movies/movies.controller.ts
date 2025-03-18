import { Controller, Get, Post, Body, Param, Query, BadRequestException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { VotingDto } from './dto/voting.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CurrentUserDto } from 'src/auth/CurrentUserdto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.moviesService.findMovieById(+id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async search(    
    @Query('title') title?: string,
    @Query('director') director?: string,
    @Query('genre') genre?: string,) 
  {
    return this.moviesService.searchMovies({ title, director, genre });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Post('rating/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('User')
  async rating(@CurrentUser() user: CurrentUserDto, @Param('id') id: string, @Body() score: CreateScoreDto)
  {
    if(score.rating < 0 || score.rating > 4)
      throw new BadRequestException('Os valores válidos são 0 até 4.');

    if(!user)
      throw new UnauthorizedException();

    if(user.role != 'User')
      throw new UnauthorizedException();

    const votingdto = new VotingDto();
    votingdto.userId = 2;
    votingdto.movieId = Number(id);
    votingdto.rating = score.rating;

    return this.moviesService.reviewRating(votingdto);
  }

  @Get(':id/details')
  @UseGuards(JwtAuthGuard)
  async details(@Param('id') id: string){
    return this.moviesService.datailsMovie(+id);
  }
}
