import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { Doctor } from './doctors/entities/doctor.entity';
import { Appointment } from './appointments/entities/appointment.entity';

@Module({
  imports: [
    // --- Configuration Module ---
    // Loads environment variables from a .env file.
    ConfigModule.forRoot({
      isGlobal: true, // Make the ConfigService available application-wide
      envFilePath: '.env',
    }),

    // --- TypeORM Module (Database Connection) ---
    // Configures the connection to the PostgreSQL database using settings from .env.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Doctor, Appointment],
        synchronize: true, // DEV ONLY: Automatically create DB schema. Use migrations in production.
      }),
    }),

    // --- Feature Modules ---
    DoctorsModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}