import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarUniversidadeDto } from './dtos/criar-universidade.dto';
import { Universidade } from './interfaces/universidade.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel('Universidade')
    private readonly universidadeModel: Model<Universidade>,
  ) {}

  async consultarTodaUniversidades(): Promise<Universidade[]> {
    return await this.universidadeModel.find().exec();
  }

  async findUniversitiesByCountry(country: string): Promise<Universidade[]> {
    const universities = await this.universidadeModel.find({ country }).exec();
    console.log(universities);
    if (!universities) {
      throw new NotFoundException(
        `Universidade do Pais ${country} não encontrada`,
      );
    }
    return universities;
  }
}
