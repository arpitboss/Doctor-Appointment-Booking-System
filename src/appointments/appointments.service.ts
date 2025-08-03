import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Between, Repository } from 'typeorm';
import { Doctor } from '../doctors/entities/doctor.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
    ) { }

    /**
     * Generates available appointment slots for a doctor on a given date.
     * Assumes standard working hours (9am-5pm) and 30-minute slots.
     */
    async getAvailableSlots(doctorId: string, date: string): Promise<string[]> {
        await this.findDoctorOrFail(doctorId);

        const startOfDay = dayjs(date).startOf('day').hour(9); // 9:00 AM
        const endOfDay = dayjs(date).startOf('day').hour(17); // 5:00 PM

        const bookedAppointments = await this.appointmentRepository.find({
            where: {
                doctorId,
                startTime: Between(startOfDay.toDate(), endOfDay.toDate()),
            },
        });

        const bookedSlots = new Set(
            bookedAppointments.map(app => dayjs(app.startTime).format('HH:mm'))
        );

        const availableSlots: string[] = [];
        let currentTime = startOfDay;

        while (currentTime.isBefore(endOfDay)) {
            const slot = currentTime.format('HH:mm');
            if (!bookedSlots.has(slot)) {
                availableSlots.push(slot);
            }
            currentTime = currentTime.add(30, 'minute');
        }

        return availableSlots;
    }

    /**
     * Books a new appointment.
     * It validates the doctor's existence and checks for overlapping appointments.
     */
    async bookAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        const { doctorId, patientName, startTime } = createAppointmentDto;

        await this.findDoctorOrFail(doctorId);

        const appointmentStart = dayjs(startTime);
        if (appointmentStart.minute() % 30 !== 0 || appointmentStart.second() !== 0) {
            throw new BadRequestException('Appointments can only be booked at 30-minute intervals (e.g., 09:00, 09:30).');
        }

        const appointmentEnd = appointmentStart.add(30, 'minute').toDate();

        const newAppointment = this.appointmentRepository.create({
            doctorId,
            patientName,
            startTime: appointmentStart.toDate(),
            endTime: appointmentEnd,
        });

        try {
            return await this.appointmentRepository.save(newAppointment);
        } catch (error) {
            // Catches the unique constraint violation from the database schema
            if (error.code === '23P01' || (error.detail && error.detail.includes('conflicts with existing key'))) {
                throw new ConflictException('This time slot is already booked for the selected doctor.');
            }
            // Re-throw other errors
            throw error;
        }
    }

    private async findDoctorOrFail(doctorId: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOneBy({ id: doctorId });
        if (!doctor) {
            throw new NotFoundException(`Doctor with ID "${doctorId}" not found.`);
        }
        return doctor;
    }
}
