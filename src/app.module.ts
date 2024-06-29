import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FinanceModule } from './finance/finance.module';
import { SeederModule } from './seeder/seeder.module';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({ ...DataSourceConfig, autoLoadEntities: true }),
    UsersModule,
    FinanceModule,
    SeederModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
