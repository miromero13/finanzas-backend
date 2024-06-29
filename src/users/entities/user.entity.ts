import { Column, Entity, OneToMany } from 'typeorm';
import { IUsers } from '../interfaces/users.interface';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BALANCE_TYPE, COMPANY_TYPE } from 'src/common/constants/type';
import { Exclude } from 'class-transformer';
import { BalanceEntity } from 'src/balance/entities/balance.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUsers {
  @Column({ type: 'varchar', nullable: false, length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 100, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, length: 15 })
  phone: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  ubication: string;

  @Column({
    type: 'enum',
    enum: COMPANY_TYPE,
    nullable: false,
  })
  company_type: COMPANY_TYPE;

  @Column({
    type: 'enum',
    enum: BALANCE_TYPE,
    nullable: false,
  })
  balance_type: BALANCE_TYPE;

  @OneToMany(() => BalanceEntity, (balance) => balance.user)
  balances: BalanceEntity[];
}
