import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormPaymentController } from './controllers/form-payment.controller';
import { FormPaymentsRepository } from './repositories/form-payments.repository';
import { FormPaymentService } from './services/form-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormPaymentsRepository])],
  controllers: [FormPaymentController],
  providers: [FormPaymentService],
})
export class FormPaymentModule {}
