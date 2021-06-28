import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TypeServiceController } from './controllers/type-service.controller';
import { TypeServicesRepository } from './repositories/type-services.repository';
import { TypeServiceService } from './services/type-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeServicesRepository]), AuthModule],
  controllers: [TypeServiceController],
  providers: [TypeServiceService],
})
export class TypeServiceModule {}
