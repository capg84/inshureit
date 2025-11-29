import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting admin password...');

  const adminEmail = 'admin@inshureit.com';
  const newPassword = 'zifpuw-wyvpin-4toWqi';

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const admin = await prisma.user.update({
    where: { email: adminEmail },
    data: {
      password: hashedPassword,
      mustChangePassword: true,
    },
  });

  console.log('✓ Admin password reset successfully!');
  console.log('  Email:', adminEmail);
  console.log('  Password:', newPassword);
  console.log('  ⚠️  Change this password after first login!');
}

main()
  .catch((e) => {
    console.error('Error resetting password:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
