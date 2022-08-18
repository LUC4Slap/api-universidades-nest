import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Universidade } from './interfaces/universidade.interface';

@Controller('universidades')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  async consultarTodasUniversidades(
    @Query('country') country: string,
  ): Promise<Universidade[] | Universidade> {
    if (country) {
      return await this.moduleService.findUniversitiesByCountry(country);
    }
    return await this.moduleService.consultarTodaUniversidades();
  }
}
