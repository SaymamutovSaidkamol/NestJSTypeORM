import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  location?: string;
}
