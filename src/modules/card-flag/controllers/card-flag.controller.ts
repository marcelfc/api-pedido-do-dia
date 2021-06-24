import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCardFlagDto } from '../dtos/create-card-flag.dto';
import CardFlag from '../entities/card-flag.entity';
import { CardFlagService } from '../services/card-flag.service';

@Controller('card-flag')
export class CardFlagController {
  constructor(private cardFlagService: CardFlagService) {}
  @Post()
  async create(
    @Body()
    createCardFlagDto: CreateCardFlagDto,
  ): Promise<CardFlag> {
    return this.cardFlagService.create(createCardFlagDto);
  }

  @Get()
  async index(): Promise<CardFlag[]> {
    return this.cardFlagService.getAll();
  }
}
