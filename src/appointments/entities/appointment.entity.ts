import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointments')
export class Appointment {
  @ApiProperty({ description: 'Unique identifier for the appointment', example: 'f1e2d3c4-b5a6-7890-1234-567890abcdef' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'ID of the doctor for this appointment' })
  @Column({ type: 'uuid' })
  doctorId: string;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ApiProperty({ description: 'Name of the patient', example: 'Alice Johnson' })
  @Column()
  patientName: string;

  @ApiProperty({ description: 'Start time of the appointment' })
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @ApiProperty({ description: 'End time of the appointment' })
  @Column({ type: 'timestamptz' })
  endTime: Date;

  @ApiProperty({ description: 'Timestamp of creation' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp of last update' })
  @UpdateDateColumn()
  updatedAt: Date;
}