import { IsEmail, IsNotEmpty } from 'class-validator';
export class CriarUsuarioDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
