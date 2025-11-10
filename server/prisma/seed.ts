import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
  const adminEmail = 'admin@inshureit.com';
  const adminPassword = 'Admin@123'; // Default password - MUST be changed on first login

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        firstName: 'System',
        lastName: 'Administrator',
        password: hashedPassword,
        userType: 'ADMIN',
        status: 'ACTIVE',
        mustChangePassword: true,
      },
    });

    console.log('✓ Created admin user:');
    console.log('  Email:', adminEmail);
    console.log('  Password:', adminPassword);
    console.log('  ⚠️  IMPORTANT: Change this password immediately after first login!');
  }

  console.log('\nDatabase seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
