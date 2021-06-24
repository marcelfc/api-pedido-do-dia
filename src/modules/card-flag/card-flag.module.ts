import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardFlagController } from './controllers/card-flag.controller';
import { CardFlagsRepository } from './repositories/card-flags.repository';
import { CardFlagService } from './services/card-flag.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardFlagsRepository])],
  controllers: [CardFlagController],
  providers: [CardFlagService],
})
export class CardFlagModule {}
