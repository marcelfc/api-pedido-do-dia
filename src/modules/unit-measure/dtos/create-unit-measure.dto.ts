import { IsString } from 'class-validator';

export class CreateUnitMeasureDto {
  @IsString()
  unit: string;

  @IsString()
  abbreviation: string;
}
