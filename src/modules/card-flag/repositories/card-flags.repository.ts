import { EntityRepository, Repository } from 'typeorm';
import { CreateCardFlagDto } from '../dtos/create-card-flag.dto';
import CardFlag from '../entities/card-flag.entity';

@EntityRepository(CardFlag)
export class CardFlagsRepository extends Repository<CardFlag> {
  async createAndSave(createCardFlagDto: CreateCardFlagDto): Promise<CardFlag> {
    const newCardFlag = this.create({
      ...createCardFlagDto,
    });

    await this.save(newCardFlag);

    return newCardFlag;
  }
}
