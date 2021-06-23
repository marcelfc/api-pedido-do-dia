import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUnitMeasureDto } from '../dtos/create-unit-measure.dto';
import UnitMeasure from '../entities/unit-measure.entity';
import { UnitMeasureService } from '../services/unit-measure.service';

@Controller('unit-measure')
export class UnitMeasureController {
  constructor(private unitMeasureService: UnitMeasureService) {}

  @Post()
  async create(
    @Body()
    createUnitMeasureDto: CreateUnitMeasureDto,
  ): Promise<UnitMeasure> {
    return this.unitMeasureService.create(createUnitMeasureDto);
  }

  @Get()
  async index(): Promise<UnitMeasure[]> {
    return this.unitMeasureService.getAll();
  }
}
