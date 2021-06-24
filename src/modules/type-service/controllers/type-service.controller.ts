import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTypeServiceDto } from '../dtos/create-type-service.dto';
import TypeService from '../entities/type-service.entity';
import { TypeServiceService } from '../services/type-service.service';

@Controller('type-service')
export class TypeServiceController {
  constructor(private typeServiceService: TypeServiceService) {}

  @Post()
  async create(
    @Body()
    createTypeServiceDto: CreateTypeServiceDto,
  ): Promise<TypeService> {
    return this.typeServiceService.create(createTypeServiceDto);
  }

  @Get()
  async index(): Promise<TypeService[]> {
    return this.typeServiceService.getAll();
  }
}
