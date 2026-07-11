import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

import { BookingsService } from './bookings.service';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingQueryDto } from './dto/booking-query.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  // CREATE BOOKING (Public)
  @Post()
  @ApiOperation({
    summary: 'Create a new booking',
  })
  create(
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(
      createBookingDto,
    );
  }

  // GET ALL BOOKINGS
  @Get()
  @ApiOperation({
    summary: 'Get all bookings',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'Kasun',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'PENDING',
  })
  findAll(
    @Query() query: BookingQueryDto,
  ) {
    return this.bookingsService.findAll(query);
  }

  // GET BOOKING BY ID
  @Get(':id')
  @ApiOperation({
    summary: 'Get booking by ID',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.bookingsService.findOne(
      +id,
    );
  }

  // UPDATE BOOKING (Protected)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Update booking',
  })
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(
      +id,
      updateBookingDto,
    );
  }

  // DELETE BOOKING (Protected)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete booking',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.bookingsService.remove(
      +id,
    );
  }
}