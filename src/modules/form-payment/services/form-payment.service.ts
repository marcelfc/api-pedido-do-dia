import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFormPaymentDto } from '../dtos/create-form-payment.dto';
import FormPayment from '../entities/form-payment.entity';
import { FormPaymentsRepository } from '../repositories/form-payments.repository';

@Injectable()
export class FormPaymentService {
  constructor(
    @InjectRepository(FormPaymentsRepository)
    private formPaymentsRepository: FormPaymentsRepository,
  ) {}

  async create(
    createFormPaymentDto: CreateFormPaymentDto,
  ): Promise<FormPayment> {
    return this.formPaymentsRepository.createAndSave(createFormPaymentDto);
  }

  async getAll(): Promise<FormPayment[]> {
    return this.formPaymentsRepository.find();
  }
}
