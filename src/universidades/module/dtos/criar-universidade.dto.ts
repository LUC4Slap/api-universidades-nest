import { IsEmail, IsNotEmpty } from 'class-validator';
export class CriarUniversidadeDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly webPage: string;

  @IsNotEmpty()
  readonly country: string;
}
