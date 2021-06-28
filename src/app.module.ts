import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UnitMeasureModule } from './modules/unit-measure/unit-measure.module';
import { CardFlagModule } from './modules/card-flag/card-flag.module';
import { FormPaymentModule } from './modules/form-payment/form-payment.module';
import { TypeServiceModule } from './modules/type-service/type-service.module';
import { CategoryModule } from './modules/category/category.module';
import * as ormconfig from './config/ormconfig';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UserModule,
    UnitMeasureModule,
    CardFlagModule,
    FormPaymentModule,
    TypeServiceModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
