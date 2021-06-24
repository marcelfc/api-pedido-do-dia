import { EntityRepository, Repository } from 'typeorm';
import { CreateTypeServiceDto } from '../dtos/create-type-service.dto';
import TypeService from '../entities/type-service.entity';

@EntityRepository(TypeService)
export class TypeServicesRepository extends Repository<TypeService> {
  async createAndSave(
    createTypeServiceDto: CreateTypeServiceDto,
  ): Promise<TypeService> {
    const newTypeService = this.create({
      ...createTypeServiceDto,
    });

    await this.save(newTypeService);

    return newTypeService;
  }
}
