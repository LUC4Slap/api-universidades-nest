import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async criarUsuario(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return await this.usersService.createUser(criarUsuarioDto);
  }

  @Get()
  async findAllUsers(@Query('email') email: string): Promise<User | User[]> {
    if (email) {
      return this.usersService.findUser(email);
    } else {
      return this.usersService.findAllUsers();
    }
  }

  @Put()
  async updateUser(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usersService.updateUser(criarUsuarioDto);
  }
}
