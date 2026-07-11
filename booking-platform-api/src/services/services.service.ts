import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';


@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}


  // CREATE
  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<Service> {

    const service =
      this.serviceRepository.create(createServiceDto);

    return this.serviceRepository.save(service);
  }


  // READ ALL
  async findAll(): Promise<Service[]> {

    return this.serviceRepository.find({
      relations: ['bookings'],
    });
  }


  // READ ONE
  async findOne(
    id: number,
  ): Promise<Service> {

    const service =
      await this.serviceRepository.findOne({
        where: { id },
        relations: ['bookings'],
      });


    if (!service) {
      throw new NotFoundException(
        'Service not found',
      );
    }


    return service;
  }


  // UPDATE
  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {

    const service =
      await this.findOne(id);


    Object.assign(
      service,
      updateServiceDto,
    );


    return this.serviceRepository.save(service);
  }



  // DELETE
  async remove(
    id: number,
  ): Promise<void> {

    const service =
      await this.findOne(id);


    await this.serviceRepository.remove(service);
  }
}