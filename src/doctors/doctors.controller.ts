import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';
import { FindDoctorsQueryDto } from './dto/find-doctors-query.dto';

@ApiTags('doctors')
@Controller({ path: 'doctors', version: '1' })
export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new doctor profile' })
    @ApiResponse({ status: 201, description: 'The doctor has been successfully created.', type: Doctor })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createDoctorDto: CreateDoctorDto) {
        return this.doctorsService.create(createDoctorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get a list of doctors' })
    @ApiQuery({ name: 'specialization', required: false, description: 'Filter by specialization' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: Number })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
    @ApiResponse({ status: 200, description: 'List of doctors.', type: [Doctor] })
    findAll(@Query() query: FindDoctorsQueryDto) {
        return this.doctorsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single doctor by ID' })
    @ApiParam({ name: 'id', description: 'Doctor UUID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Doctor details.', type: Doctor })
    @ApiResponse({ status: 404, description: 'Doctor not found.' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.doctorsService.findOne(id);
    }
}