import { IsString, IsBoolean } from 'class-validator';

export class CreateTypeServiceDto {
  @IsString()
  type_service: string;

  @IsBoolean()
  delivery: boolean;
}
