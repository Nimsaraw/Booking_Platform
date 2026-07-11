import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingQueryDto } from './dto/booking-query.dto';
import { BookingStatus } from './enums/booking-status.enum';

import { Service } from '../services/entities/service.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  // CREATE BOOKING
  async create(
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    // Check service exists
    const service = await this.serviceRepository.findOne({
      where: {
        id: createBookingDto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException(
        'Service not found',
      );
    }

    // Check service is active
    if (!service.isActive) {
      throw new BadRequestException(
        'This service is currently unavailable',
      );
    }

    // Check booking date
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(
      createBookingDto.bookingDate,
    );

    if (bookingDate < today) {
      throw new BadRequestException(
        'Booking date cannot be in the past',
      );
    }

    // Prevent duplicate bookings
    const existingBooking =
      await this.bookingRepository.findOne({
        where: {
          serviceId: createBookingDto.serviceId,
          bookingDate: createBookingDto.bookingDate,
          bookingTime: createBookingDto.bookingTime,
        },
      });

    if (existingBooking) {
      throw new ConflictException(
        'This time slot is already booked',
      );
    }

    const booking =
      this.bookingRepository.create({
        ...createBookingDto,
        service,
      });

    return this.bookingRepository.save(
      booking,
    );
  }

  // GET ALL BOOKINGS
  async findAll(
    query: BookingQueryDto,
  ) {
    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const queryBuilder =
      this.bookingRepository.createQueryBuilder(
        'booking',
      );

    queryBuilder.leftJoinAndSelect(
      'booking.service',
      'service',
    );

    // Search by customer name
    // Search by customer name or email
    if (query.search) {
      queryBuilder.andWhere(
        `(LOWER(booking.customerName) LIKE LOWER(:search)
      OR LOWER(booking.customerEmail) LIKE LOWER(:search))`,
        {
          search: `%${query.search}%`,
        },
      );
    }

    // Filter by booking status
    if (query.status) {
      queryBuilder.andWhere(
        'booking.status = :status',
        {
          status: query.status,
        },
      );
    }

    // Latest first
    queryBuilder.orderBy(
      'booking.createdAt',
      'DESC',
    );

    const [data, total] =
      await queryBuilder
        .skip(skip)
        .take(limit)
        .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }

  // GET BOOKING BY ID
  async findOne(
    id: number,
  ): Promise<Booking> {
    const booking =
      await this.bookingRepository.findOne({
        where: {
          id,
        },
        relations: ['service'],
      });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    return booking;
  }

  // UPDATE BOOKING
  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking =
      await this.findOne(id);

    // Business Rule
    if (
      booking.status ===
      BookingStatus.CANCELLED &&
      updateBookingDto.status ===
      BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled bookings cannot be marked as completed',
      );
    }

    Object.assign(
      booking,
      updateBookingDto,
    );

    return this.bookingRepository.save(
      booking,
    );
  }

  // DELETE BOOKING
  async remove(
    id: number,
  ): Promise<void> {
    const booking =
      await this.findOne(id);

    await this.bookingRepository.remove(
      booking,
    );
  }
}