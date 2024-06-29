import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { handlerError } from 'src/common/utils/handler-error.utils';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;
      return this.userRepository.save(newUser);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
}
