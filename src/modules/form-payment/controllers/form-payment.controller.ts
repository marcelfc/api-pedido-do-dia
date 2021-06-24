import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFormPaymentDto } from '../dtos/create-form-payment.dto';
import FormPayment from '../entities/form-payment.entity';
import { FormPaymentService } from '../services/form-payment.service';

@Controller('form-payment')
export class FormPaymentController {
  constructor(private formPaymentService: FormPaymentService) {}

  @Post()
  async create(
    @Body()
    createformPaymentDto: CreateFormPaymentDto,
  ): Promise<FormPayment> {
    return this.formPaymentService.create(createformPaymentDto);
  }

  @Get()
  async index(): Promise<FormPayment[]> {
    return this.formPaymentService.getAll();
  }
}
