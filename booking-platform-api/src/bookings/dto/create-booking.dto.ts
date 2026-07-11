import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BookingStatus } from '../enums/booking-status.enum';



export class CreateBookingDto {


  @ApiProperty({
    example: 'Yuwanga',
  })
  @IsNotEmpty()
  customerName!: string;



  @ApiProperty({
    example: 'yuwanga@gmail.com',
  })
  @IsEmail()
  customerEmail!: string;



  @ApiProperty({
    example: '0712345678',
  })
  @IsNotEmpty()
  customerPhone!: string;



  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  serviceId!: number;



  @ApiProperty({
    example: '2026-07-15',
  })
  @IsDateString()
  bookingDate!: string;



  @ApiProperty({
    example: '10:00',
  })
  @IsNotEmpty()
  bookingTime!: string;



  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;



  @ApiProperty({
    example: 'Morning appointment',
    required: false,
  })
  @IsOptional()
  notes?: string;

}