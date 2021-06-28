import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateTypeServiceDto } from '../dtos/create-type-service.dto';
import TypeService from '../entities/type-service.entity';
import { TypeServiceService } from '../services/type-service.service';

@Controller('type-service')
export class TypeServiceController {
  constructor(private typeServiceService: TypeServiceService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('ADMIN')
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
