import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
    @ApiProperty({ description: 'Name of the doctor', example: 'Dr. John Smith' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Specialization of the doctor', example: 'Pediatrics' })
    @IsString()
    @IsNotEmpty()
    specialization: string;
}