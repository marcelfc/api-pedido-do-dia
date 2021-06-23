import { EntityRepository, Repository } from 'typeorm';
import { CreateUnitMeasureDto } from '../dtos/create-unit-measure.dto';
import UnitMeasure from '../entities/unit-measure.entity';

@EntityRepository(UnitMeasure)
export class UnitsMeasureRepository extends Repository<UnitMeasure> {
  async createAndSave(
    createUnitMeasureDto: CreateUnitMeasureDto,
  ): Promise<UnitMeasure> {
    const newUnitMeasure = this.create({
      ...createUnitMeasureDto,
    });

    await this.save(newUnitMeasure);

    return newUnitMeasure;
  }
}
