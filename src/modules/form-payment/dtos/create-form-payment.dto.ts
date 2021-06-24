import { IsString, IsBoolean } from 'class-validator';

export class CreateFormPaymentDto {
  @IsString()
  form_payment: string;

  @IsBoolean()
  credit?: boolean;

  @IsBoolean()
  debit?: boolean;
}
