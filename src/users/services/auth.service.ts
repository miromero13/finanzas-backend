import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthDto } from '../dto/create-auth.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { handlerError } from 'src/common/utils/handler-error.utils';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';

import * as jwt from 'jsonwebtoken';

export interface IUserToken {
  role: string;
  sub: string;
  isExpired: boolean;
}

export interface ITokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}


const userToken = (token: string): IUserToken | string => {
  try {
    const decode = jwt.decode(token) as ITokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    const isExpired = +expiresDate <= +currentDate / 1000;
    return {
      role: decode.role,
      sub: decode.sub,
      isExpired,
    };
  } catch (error) {
    return 'Token no valido.';
  }
};


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

  public async checkToken(token: string): Promise<UserEntity> {
    try {
      const managerToken: IUserToken | string = userToken(token);
      if (typeof managerToken === 'string')
        throw new NotFoundException('Token invalido');
      if (managerToken.isExpired) throw new NotFoundException('Token expirado');
      const user = await this.userService.findOne(managerToken.sub);
      return user;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
