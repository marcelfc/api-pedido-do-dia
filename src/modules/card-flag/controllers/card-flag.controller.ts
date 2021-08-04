import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateCardFlagDto } from '../dtos/create-card-flag.dto';
import CardFlag from '../entities/card-flag.entity';
import { CardFlagService } from '../services/card-flag.service';

@Controller('card-flag')
export class CardFlagController {
  constructor(private cardFlagService: CardFlagService) {}
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('ADMIN')
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

  @Get()
  async teste(): Promise<CardFlag[]> {
    return this.cardFlagService.getAll();
  }

  @Get()
  async testeteste(): Promise<CardFlag[]> {
    return this.cardFlagService.getAll();
  }
}
