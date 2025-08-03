import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindDoctorsQueryDto {
    @ApiPropertyOptional({ description: 'Filter by specialization', example: 'Dermatology' })
    @IsOptional()
    @IsString()
    specialization?: string;

    @ApiPropertyOptional({ description: 'Page number for pagination', example: 1, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Number of items per page', example: 10, default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}