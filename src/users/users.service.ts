import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private readonly UsersModule: Model<User>,
  ) {}

  async createUser(criarUsuario: CriarUsuarioDto): Promise<User> {
    const userExist = await this.UsersModule.findOne({
      email: criarUsuario.email,
    }).exec();
    if (userExist) {
      return userExist;
    }
    const User = new this.UsersModule(criarUsuario);
    return await User.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.UsersModule.find().exec();
  }

  async updateUser(user: CriarUsuarioDto): Promise<User> {
    const userExist = await this.UsersModule.findOne({
      email: user.email,
    }).exec();

    if (userExist) {
      return await this.UsersModule.findOneAndUpdate(
        { email: user.email },
        { $set: user },
      ).exec();
    } else {
      throw new NotFoundException(
        `Usuario com E-mail: ${user.email} não encontrado`,
      );
    }
  }

  async findUser(email: string): Promise<User> {
    if (email == null || email == undefined) {
      throw new NotFoundException(
        `É obrigatorio passar um email para esta rota`,
      );
    }
    const userExist = await this.UsersModule.findOne({ email }).exec();
    if (!userExist) {
      throw new NotFoundException(
        `Usuario com E-mail: ${email} não encontrado`,
      );
    }
    return userExist;
  }

  async deletUser(email: string): Promise<any> {
    if (email == null || email == undefined) {
      throw new NotFoundException(
        `É obrigatorio passar um email para esta rota`,
      );
    }
    const userExist = await this.UsersModule.findOne({ email }).exec();
    if (!userExist) {
      throw new NotFoundException(
        `Usuario com E-mail: ${email} não encontrado`,
      );
    }
    await this.UsersModule.deleteOne({ email }).exec();
    return {
      message: `Usuario ${userExist.name} com E-mail ${email} excluido`,
    };
  }
}
