import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FinanceModule } from './finance/finance.module';
import { SeederModule } from './seeder/seeder.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    FinanceModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
