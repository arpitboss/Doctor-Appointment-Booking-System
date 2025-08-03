import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';
import { AvailableSlotsQueryDto } from './dto/available-slots-query.dto';

@ApiTags('appointments')
@Controller({ path: 'appointments', version: '1' })
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('doctors/:doctorId/available-slots')
  @ApiOperation({ summary: 'Get available time slots for a doctor on a specific date' })
  @ApiParam({ name: 'doctorId', description: 'Doctor UUID', type: 'string' })
  @ApiQuery({ name: 'date', description: 'Date to check for availability (YYYY-MM-DD)', example: '2025-08-04' })
  @ApiResponse({ status: 200, description: 'List of available time slots.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  getAvailableSlots(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
    @Query() query: AvailableSlotsQueryDto,
  ) {
    return this.appointmentsService.getAvailableSlots(doctorId, query.date);
  }

  @Post()
  @ApiOperation({ summary: 'Book a new appointment' })
  @ApiResponse({ status: 201, description: 'The appointment has been successfully booked.', type: Appointment })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid time slot).' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiResponse({ status: 409, description: 'Conflict (e.g., time slot is already booked).' })
  bookAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.bookAppointment(createAppointmentDto);
  }
}