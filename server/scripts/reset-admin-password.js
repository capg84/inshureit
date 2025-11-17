const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  const newPassword = 'Admin@123';

  console.log('Resetting admin password...');

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const user = await prisma.user.update({
    where: { email: 'admin@inshureit.com' },
    data: { password: hashedPassword }
  });

  console.log('✓ Admin password reset successfully!');
  console.log('');
  console.log('Login credentials:');
  console.log('  Email:', user.email);
  console.log('  Password:', newPassword);
  console.log('');

  await prisma.$disconnect();
}

resetAdminPassword()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  });
