import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('doctors')
export class Doctor {
    @ApiProperty({ description: 'Unique identifier for the doctor', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Name of the doctor', example: 'Dr. Jane Doe' })
    @Column()
    name: string;

    @ApiProperty({ description: 'Specialization of the doctor', example: 'Cardiology' })
    @Column()
    specialization: string;

    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.doctor)
    appointments: Appointment[];

    @ApiProperty({ description: 'Timestamp of creation' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp of last update' })
    @UpdateDateColumn()
    updatedAt: Date;
}