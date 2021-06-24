import { EntityRepository, Repository } from 'typeorm';
import { CreateFormPaymentDto } from '../dtos/create-form-payment.dto';
import FormPayment from '../entities/form-payment.entity';

@EntityRepository(FormPayment)
export class FormPaymentsRepository extends Repository<FormPayment> {
  async createAndSave(
    createFormPaymentDto: CreateFormPaymentDto,
  ): Promise<FormPayment> {
    const newFormPayment = this.create({
      ...createFormPaymentDto,
    });

    await this.save(newFormPayment);

    return newFormPayment;
  }
}
