import { IsString } from 'class-validator';

export class CreateCardFlagDto {
  @IsString()
  card_flag: string;
}
