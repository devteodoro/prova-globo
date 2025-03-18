import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CryptographyService } from '../Commom/cryptography/cryptography.service'
import { UserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptography: CryptographyService,
    private readonly jwtService: JwtService,
  ){}

  async login(username: string, password: string){

    const user = await this.userRepository.findOne({ where: { username, deleted: false } });

    if(!user)
      throw new UnauthorizedException(`Usuário não encontrado!`);

    const validPassword = await this.cryptography.ValidatePassword(user.password, password);

    if(validPassword){
      const payload = {username: user.username, sub: user.id, role: user.role}
      return {
        accessToken: this.jwtService.sign(payload)
      }
    }
      
    return new UnauthorizedException('Credenciais inválidas');
  }
}