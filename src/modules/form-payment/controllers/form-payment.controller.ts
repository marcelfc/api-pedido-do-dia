import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateFormPaymentDto } from '../dtos/create-form-payment.dto';
import FormPayment from '../entities/form-payment.entity';
import { FormPaymentService } from '../services/form-payment.service';

@Controller('form-payment')
export class FormPaymentController {
  constructor(private formPaymentService: FormPaymentService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('ADMIN')
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
