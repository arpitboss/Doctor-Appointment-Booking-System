import { createConnection } from 'typeorm';
import { Doctor } from './doctors/entities/doctor.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const configService = new ConfigService();

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding process...');

  const connection = await createConnection({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [Doctor, Appointment],
    synchronize: true, // Should match the main app config. Be cautious in production.
  });

  console.log('🔗 Database connection established.');

  const doctorRepository = connection.getRepository(Doctor);
  const appointmentRepository = connection.getRepository(Appointment);

  // Clear existing data to ensure a clean slate
  console.log('🗑️  Clearing existing appointment and doctor data...');
  await appointmentRepository.query('DELETE FROM appointments;');
  await doctorRepository.query('DELETE FROM doctors;');
  console.log('✅ Data cleared.');

  // Sample doctor data
  const doctorsToSeed = [
    { name: 'Dr. Evelyn Reed', specialization: 'Cardiology' },
    { name: 'Dr. Samuel Carter', specialization: 'Pediatrics' },
    { name: 'Dr. Olivia Chen', specialization: 'Dermatology' },
    { name: 'Dr. Benjamin Grant', specialization: 'Neurology' },
    { name: 'Dr. Sophia Martinez', specialization: 'Orthopedics' },
  ];

  console.log(`💉 Seeding ${doctorsToSeed.length} doctors...`);

  for (const doctorData of doctorsToSeed) {
    const doctor = doctorRepository.create(doctorData);
    await doctorRepository.save(doctor);
    console.log(`   - Seeded ${doctor.name} (${doctor.specialization})`);
  }

  console.log('✅ Seeding complete.');

  await connection.close();
  console.log('🚪 Database connection closed.');
};

seedDatabase().catch(error => {
  console.error('❌ An error occurred during seeding:', error);
  process.exit(1);
});