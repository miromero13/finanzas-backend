import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/create-auth.dto';
import { ResponseMessage } from 'src/common/interfaces/reponse-message.interface';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async create(@Body() createAuthDto: AuthDto): Promise<ResponseMessage> {
    return {
      data: await this.authService.login(createAuthDto),
      statusCode: 200,
    };
  }

  @ApiQuery({ name: 'token', type: 'string', required: true })
  @Get('check-token')
  public async checkToken(@Query('token') token: string): Promise<ResponseMessage> {
    return {
      statusCode: 200,
      data: await this.authService.checkToken(token)
    };
  }
}
