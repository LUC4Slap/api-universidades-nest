import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleModule } from './universidades/module/module.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/universidades', {
      useNewUrlParser: true,
    }),
    ModuleModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
