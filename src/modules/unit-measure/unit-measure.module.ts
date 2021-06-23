import { Module } from '@nestjs/common';
import { UnitMeasureService } from './services/unit-measure.service';
import { UnitMeasureController } from './controllers/unit-measure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsMeasureRepository } from './repositories/units-measure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UnitsMeasureRepository])],
  providers: [UnitMeasureService],
  controllers: [UnitMeasureController],
})
export class UnitMeasureModule {}
