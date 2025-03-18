import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { CryptographyService } from '../Commom/cryptography/cryptography.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptography: CryptographyService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {

    if(!createUserDto){
      throw new BadRequestException();
    }
      
    const username = createUserDto.username;
    const userExists = await this.userRepository.findOne({ where: { username } });

    if(userExists){
      throw new BadRequestException(`O username ${username} não está disponível`);
    }

    createUserDto.password = await this.cryptography.encripty(createUserDto.password);

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return this.toDto(user); 
  }

  async search(filters: { username?: string; role?: 'Admin' | 'User '; deleted?: boolean }): Promise<UserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filters.username)
      queryBuilder.andWhere('user.username LIKE :username', { username: `%${filters.username}%` });

    if (filters.role) 
      queryBuilder.andWhere('user.role = :role', { role: filters.role });

    if (filters.deleted !== undefined) 
      queryBuilder.andWhere('user.deleted = :deleted', { deleted: filters.deleted });

    const users = await queryBuilder.getMany();
    return users.map(x => this.toDto(x));
  }

  async findById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id, deleted: false } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado!`);
    }
    return this.toDto(user);
  }

  async findByName(username: string): Promise<User>{
    const user = await this.userRepository.findOne({ where: { username, deleted: false } });

    if(!user)
      throw new NotFoundException(`Usuário não encontrado!`);

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id, deleted: false } });

    if(!user)
      throw new NotFoundException(`Usuário com ID ${id} não encontrado!`);

    const username = updateUserDto.username;   
    const userExists = await this.userRepository.findOne({ where: { username } });

    if(userExists && user.id !== userExists.id)
      throw new BadRequestException(`O username ${username} não está disponível`);

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return this.toDto(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id, deleted: false } });

    if(!user)
      throw new NotFoundException(`Usuário com ID ${id} não encontrado!`);

    user.deleted = true;
    await this.userRepository.save(user);
  }

  private toDto(user: User): UserDto {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}
