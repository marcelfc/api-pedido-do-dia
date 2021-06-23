import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnitMeasureDto } from '../dtos/create-unit-measure.dto';
import UnitMeasure from '../entities/unit-measure.entity';
import { UnitsMeasureRepository } from '../repositories/units-measure.repository';

@Injectable()
export class UnitMeasureService {
  constructor(
    @InjectRepository(UnitsMeasureRepository)
    private unitsMeasureRepository: UnitsMeasureRepository,
  ) {}

  async create(
    createUnitMeasureDto: CreateUnitMeasureDto,
  ): Promise<UnitMeasure> {
    return this.unitsMeasureRepository.createAndSave(createUnitMeasureDto);
  }

  async getAll(): Promise<UnitMeasure[]> {
    return this.unitsMeasureRepository.find();
  }
}
