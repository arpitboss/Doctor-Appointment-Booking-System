import { IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvailableSlotsQueryDto {
  @ApiProperty({ description: 'Date to check for availability (YYYY-MM-DD)', example: '2025-08-04' })
  @IsDateString()
  @IsNotEmpty()
  date: string;
}