import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypeServiceDto } from '../dtos/create-type-service.dto';
import TypeService from '../entities/type-service.entity';
import { TypeServicesRepository } from '../repositories/type-services.repository';

@Injectable()
export class TypeServiceService {
  constructor(
    @InjectRepository(TypeServicesRepository)
    private typeServicesRepository: TypeServicesRepository,
  ) {}

  async create(
    createTypeServiceDto: CreateTypeServiceDto,
  ): Promise<TypeService> {
    return this.typeServicesRepository.createAndSave(createTypeServiceDto);
  }

  async getAll(): Promise<TypeService[]> {
    return this.typeServicesRepository.find();
  }
}
