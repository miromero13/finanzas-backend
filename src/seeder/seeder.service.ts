import { Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  findAll() {
    return `This action returns all seeder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seeder`;
  }
}
