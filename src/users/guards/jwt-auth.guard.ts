import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //Se puede usar canActive y se puede aplicar una serie de parámetros para saber si ese tokken tiene un rol
  //especifico, es un admin, manager, tener permisos
}
