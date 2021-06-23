import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UnitMeasureModule } from './modules/unit-measure/unit-measure.module';
import * as ormconfig from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UserModule,
    UnitMeasureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
