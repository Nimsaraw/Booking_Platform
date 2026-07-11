import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';


export class CreateServiceDto {


  @ApiProperty({
    example: 'Hair Cut',
    description: 'Service title',
  })
  @IsNotEmpty()
  title!: string;



  @ApiProperty({
    example: 'Professional haircut service',
    description: 'Service description',
  })
  @IsNotEmpty()
  description!: string;



  @ApiProperty({
    example: 30,
    description: 'Service duration in minutes',
  })
  @IsNumber()
  duration!: number;



  @ApiProperty({
    example: 1500,
    description: 'Service price',
  })
  @IsNumber()
  price!: number;



  @ApiProperty({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}