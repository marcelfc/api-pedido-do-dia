import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as ormconfig from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
