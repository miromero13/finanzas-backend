import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BalanceService } from '../services/balance.service';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { CreateBalanceDto } from '../dto/create-balance.dto';

@ApiBearerAuth()
@ApiTags('Balance')
@UseGuards(JwtAuthGuard)
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createBalanceDto: CreateBalanceDto,
  ) {
    console.log('User Id: ' + userId);
    return this.balanceService.createBalance(createBalanceDto, userId);
  }

  @Get('one/:userId')
  @ApiQuery({ name: 'year', type: 'number' })
  @ApiQuery({
    name: 'month',
    type: 'number',
    required: false,
  })
  public async getOne(
    @Param('userId') userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month?: number,
  ) {
    return await this.balanceService.getOne(userId, year, month);
  }

  @Get('all/:userId')
  public async getAll(@Param('userId') userId: string) {
    return await this.balanceService.get(userId);
  }

  @Get('static-patrimonial-analysis/:userId')
  @ApiQuery({ name: 'year', type: 'number' })
  @ApiQuery({
    name: 'month',
    type: 'number',
    required: false,
  })
  public async staticPatrimonialAnalysis(
    @Param('userId') userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month?: number,
  ) {
    return await this.balanceService.staticPatrimonialAnalysis(
      userId,
      year,
      month,
    );
  }

  @Get('dinamic-patrimonial-analysis/:userId')
  public async dinamicPatrimonialAnalysis(@Param('userId') userId: string) {
    return await this.balanceService.dinamicPatrimonialAnalysis(userId);
  }

  @Get('finance-analysis/:userId')
  @ApiQuery({ name: 'year', type: 'number' })
  @ApiQuery({
    name: 'month',
    type: 'number',
    required: false,
  })
  public async financialAnalysis(
    @Param('userId') userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month?: number,
  ) {
    return await this.balanceService.financialAnalysis(userId, year, month);
  }
}
