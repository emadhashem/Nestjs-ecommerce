import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  userName: string;

  @IsString()
  @IsEmail(
    {},
    {
      message: 'Email must be valid email.',
    },
  )
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
