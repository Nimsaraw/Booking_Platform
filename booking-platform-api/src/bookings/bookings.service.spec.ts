import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BookingsService } from './bookings.service';

import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';

import { BookingStatus } from './enums/booking-status.enum';



describe('BookingsService', () => {


  let service: BookingsService;

  let bookingRepository: any;

  let serviceRepository: any;



  beforeEach(async () => {


    const module: TestingModule =
      await Test.createTestingModule({

        providers: [

          BookingsService,


          {
            provide:
              getRepositoryToken(Booking),

            useValue: {


              findOne:
                jest.fn(),


              create:
                jest.fn(),


              save:
                jest.fn(),


              remove:
                jest.fn(),


              createQueryBuilder:
                jest.fn(),


            },

          },



          {
            provide:
              getRepositoryToken(Service),

            useValue: {


              findOne:
                jest.fn(),


            },

          },

        ],


      }).compile();




    service =
      module.get<BookingsService>(
        BookingsService,
      );



    bookingRepository =
      module.get(
        getRepositoryToken(Booking),
      );



    serviceRepository =
      module.get(
        getRepositoryToken(Service),
      );


  });





  // 1. Service should be defined

  it(
    'should be defined',
    () => {


      expect(service)
        .toBeDefined();


    },
  );







  // 2. Service not found

  it(
    'should throw NotFoundException if service does not exist',
    async () => {


      serviceRepository.findOne
        .mockResolvedValue(null);



      await expect(

        service.create({

          customerName:
            'Yuwanga',

          customerEmail:
            'yuwanga@gmail.com',

          customerPhone:
            '0712345678',

          serviceId:
            999,

          bookingDate:
            '2026-07-20',

          bookingTime:
            '10:00',

          notes:
            'Test',

        }),


      ).rejects.toThrow(
        'Service not found',
      );


    },
  );







  // 3. Inactive service validation

  it(
    'should throw BadRequestException if service is inactive',
    async () => {


      serviceRepository.findOne
        .mockResolvedValue({

          id:1,

          title:
            'Hair Cut',

          isActive:false,

        });



      await expect(

        service.create({

          customerName:
            'Yuwanga',

          customerEmail:
            'yuwanga@gmail.com',

          customerPhone:
            '0712345678',

          serviceId:
            1,

          bookingDate:
            '2026-07-20',

          bookingTime:
            '10:00',

          notes:
            'Inactive test',

        }),


      ).rejects.toThrow(
        'This service is currently unavailable',
      );


    },
  );







  // 4. Past date validation

  it(
    'should throw BadRequestException if booking date is in the past',
    async () => {


      serviceRepository.findOne
        .mockResolvedValue({

          id:1,

          isActive:true,

        });



      await expect(

        service.create({

          customerName:
            'Yuwanga',

          customerEmail:
            'yuwanga@gmail.com',

          customerPhone:
            '0712345678',

          serviceId:
            1,

          bookingDate:
            '2020-01-01',

          bookingTime:
            '10:00',

        }),


      ).rejects.toThrow(
        'Booking date cannot be in the past',
      );


    },
  );







  // 5. Duplicate booking validation

  it(
    'should throw ConflictException if booking already exists',
    async () => {


      serviceRepository.findOne
        .mockResolvedValue({

          id:1,

          isActive:true,

        });



      bookingRepository.findOne
        .mockResolvedValue({

          id:10,

          serviceId:1,

          bookingDate:
            '2026-07-20',

          bookingTime:
            '10:00',

        });



      await expect(

        service.create({

          customerName:
            'Yuwanga',

          customerEmail:
            'yuwanga@gmail.com',

          customerPhone:
            '0712345678',

          serviceId:
            1,

          bookingDate:
            '2026-07-20',

          bookingTime:
            '10:00',

        }),


      ).rejects.toThrow(
        'This time slot is already booked',
      );


    },
  );








  // 6. Find booking by id

  it(
    'should return booking by id',
    async () => {


      const booking = {


        id:1,

        customerName:
          'Yuwanga',

      };



      bookingRepository.findOne
        .mockResolvedValue(
          booking,
        );



      const result =
        await service.findOne(1);



      expect(result)
        .toEqual(
          booking,
        );


    },
  );








  // 7. Booking not found

  it(
    'should throw NotFoundException if booking not found',
    async () => {


      bookingRepository.findOne
        .mockResolvedValue(
          null,
        );



      await expect(

        service.findOne(999),

      ).rejects.toThrow(
        'Booking not found',
      );


    },
  );








  // 8. Cancelled booking cannot complete

  it(
    'should not allow cancelled booking to become completed',
    async () => {


      bookingRepository.findOne
        .mockResolvedValue({

          id:1,

          status:
            BookingStatus.CANCELLED,

        });



      await expect(

        service.update(

          1,

          {

            status:
              BookingStatus.COMPLETED,

          },

        ),

      ).rejects.toThrow(
        'Cancelled bookings cannot be marked as completed',
      );


    },
  );








  // 9. Remove booking

  it(
    'should remove booking successfully',
    async () => {


      const booking = {


        id:1,


      };



      bookingRepository.findOne
        .mockResolvedValue(
          booking,
        );



      bookingRepository.remove
        .mockResolvedValue(
          booking,
        );



      await service.remove(1);



      expect(
        bookingRepository.remove,
      )
      .toHaveBeenCalledWith(
        booking,
      );


    },
  );



});