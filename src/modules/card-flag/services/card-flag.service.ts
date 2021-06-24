import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardFlagDto } from '../dtos/create-card-flag.dto';
import CardFlag from '../entities/card-flag.entity';
import { CardFlagsRepository } from '../repositories/card-flags.repository';

@Injectable()
export class CardFlagService {
  constructor(
    @InjectRepository(CardFlagsRepository)
    private cardFlagsRepository: CardFlagsRepository,
  ) {}

  async create(createCardFlagDto: CreateCardFlagDto): Promise<CardFlag> {
    return this.cardFlagsRepository.createAndSave(createCardFlagDto);
  }

  async getAll(): Promise<CardFlag[]> {
    return this.cardFlagsRepository.find();
  }
}
