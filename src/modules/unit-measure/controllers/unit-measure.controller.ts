import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateUnitMeasureDto } from '../dtos/create-unit-measure.dto';
import UnitMeasure from '../entities/unit-measure.entity';
import { UnitMeasureService } from '../services/unit-measure.service';

@Controller('unit-measure')
export class UnitMeasureController {
  constructor(private unitMeasureService: UnitMeasureService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('ADMIN')
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
