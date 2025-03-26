import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
