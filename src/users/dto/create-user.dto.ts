import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BALANCE_TYPE, COMPANY_TYPE } from 'src/common/constants/type';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @ApiProperty({
    example: '+591 71456789',
    description: 'The phone number of the user',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    example: '123 Main St, Springfield',
    description: 'The ubication of the user',
    required: false,
  })
  ubication?: string;

  @ApiProperty({
    example: COMPANY_TYPE.COMMERCIAL,
    description: 'The type of the company',
  })
  @IsNotEmpty()
  @IsEnum(COMPANY_TYPE)
  company_type: COMPANY_TYPE;

  @ApiProperty({
    example: BALANCE_TYPE.MONTHLY,
    description: 'The type of balance',
  })
  @IsNotEmpty()
  @IsEnum(BALANCE_TYPE)
  balance_type: BALANCE_TYPE;
}
