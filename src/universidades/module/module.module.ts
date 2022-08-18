import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversidadeSchema } from './interfaces/universidade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Universidade',
        schema: UniversidadeSchema,
      },
    ]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
