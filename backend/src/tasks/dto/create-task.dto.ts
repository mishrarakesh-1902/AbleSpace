import { IsString, IsOptional, IsArray, IsObject, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  reporter?: string;

  @IsOptional()
  members?: any;

  @IsOptional()
  labels?: any;
}
