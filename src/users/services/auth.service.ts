import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthDto } from '../dto/create-auth.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { handlerError } from 'src/common/utils/handler-error.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(authDto: AuthDto) {
    try {
      const { email, password } = authDto;
      const user = await this.userService.findByEmail(email);
      if (!user) throw new NotFoundException('Correo incorrecto');
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new NotFoundException('Contraseña incorrecta');
      const payload = { id: user.id, name: user.name };
      const token = this.jwtService.sign(payload);
      const data = { user, token };
      return data;
    } catch (error) {
      handlerError(error, this.logger);
      throw error;
    }
  }
}
