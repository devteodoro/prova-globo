import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { VotingDto } from './dto/voting.dto';
import { Score } from './entities/score.entity';
import { User } from 'src/users/entities/user.entity';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findMovieById(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado!`);
    }
    return movie;
  }

  async searchMovies(filters: { title?: string; director?: string; genre?: string }) : Promise<Movie[]> {
    const queryBuilder = this.moviesRepository.createQueryBuilder('movie');
    
    if (filters.title)
      queryBuilder.andWhere('movie.title LIKE :title', { title: `%${filters.title}%` });

    if (filters.genre) 
      queryBuilder.andWhere('movie.genre LIKE :genre', { genre: `%${filters.genre}%` });

    if (filters.director) 
      queryBuilder.andWhere('movie.director LIKE :director', { director: `%${filters.director}%` });

    const movies = await queryBuilder.getMany();
    console.log(movies);
    return movies;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    if(!createMovieDto)
      throw new BadRequestException();

    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async reviewRating(review: VotingDto): Promise<void> {

    if(!VotingDto)
      throw new BadRequestException();

    const user = await this.userRepository.findOne({ where: { id: review.userId } });
   
    if(!user)
      throw new NotFoundException("Usuário não encontrado.");

    const movie = await this.moviesRepository.findOne({ where: { id: review.movieId } });

    if(!movie)
      throw new NotFoundException("Filme não encontrado.");

    const score = new Score();
    score.rating = review.rating;
    score.movie = movie;
    score.user = user;

    await this.scoreRepository.save(score);
  }

  async datailsMovie(id: number): Promise<MovieDto>{
    const movie = await this.moviesRepository.findOne({
      where:{
        id
      },
      relations: ['scores']
    });

    if(!movie)
      throw new NotFoundException("Filme não encontrado!");

    var moviedto = new MovieDto();
    moviedto.id = movie.id;
    moviedto.title = movie.title;
    moviedto.director = movie.director;
    moviedto.genre = movie.genre;
    moviedto.scores = movie.scores;
    moviedto.average = this.calculateAverage(movie.scores);
    return moviedto
  }

  calculateAverage(scores: Score[]): number {
    const averageRating = scores.length > 0 
    ? scores.reduce((acc, score) => acc + score.rating, 0) / scores.length
    : 0;

    return averageRating;
  }
}
