import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { Doctor } from './entities/doctor.entity'
import { FindDoctorsQueryDto } from './dto/find-doctors-query.dto';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
    ) { }

    create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = this.doctorRepository.create(createDoctorDto);
        return this.doctorRepository.save(doctor);
    }

    async findAll(query: FindDoctorsQueryDto): Promise<{ data: Doctor[], count: number }> {
        const { specialization, page = 1, limit = 10 } = query;
        const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');

        if (specialization) {
            queryBuilder.where('doctor.specialization ILIKE :specialization', {
                specialization: `%${specialization}%`,
            });
        }

        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        const [data, count] = await queryBuilder.getManyAndCount();

        return { data, count };
    }

    async findOne(id: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOneBy({ id });
        if (!doctor) {
            throw new NotFoundException(`Doctor with ID "${id}" not found`);
        }
        return doctor;
    }
}