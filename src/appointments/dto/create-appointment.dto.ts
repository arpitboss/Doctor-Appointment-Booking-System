import { IsString, IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'UUID of the doctor to book with', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ description: 'Name of the patient', example: 'Bob Williams' })
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @ApiProperty({ description: 'Start time of the appointment in ISO 8601 format', example: '2025-08-04T10:30:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;
}