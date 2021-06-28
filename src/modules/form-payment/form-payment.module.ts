import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FormPaymentController } from './controllers/form-payment.controller';
import { FormPaymentsRepository } from './repositories/form-payments.repository';
import { FormPaymentService } from './services/form-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormPaymentsRepository]), AuthModule],
  controllers: [FormPaymentController],
  providers: [FormPaymentService],
})
export class FormPaymentModule {}
