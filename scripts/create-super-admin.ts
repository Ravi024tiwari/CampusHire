import path from 'path';
import dotenv from 'dotenv';

// Load both .env and .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { prisma } from '../lib/prisma';
import { Role } from '../src/generated/prisma';

const email =
  process.env.SUPER_ADMIN_EMAIL ||
  process.env.ADMIN_EMAIL ||
  process.env.SUPERADMIN_EMAIL ||
  process.argv[2] ||
  'admin@campushire.com';

const password =
  process.env.SUPER_ADMIN_PASSWORD ||
  process.env.ADMIN_PASSWORD ||
  process.env.SUPERADMIN_PASSWORD ||
  process.argv[3] ||
  'Admin@123456';

const name =
  process.env.SUPER_ADMIN_NAME ||
  process.env.ADMIN_NAME ||
  process.env.SUPERADMIN_NAME ||
  process.argv[4] ||
  'Super Administrator';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'campushire-fallback-secret-key-for-development';
  return new TextEncoder().encode(secret);
}

async function main() {
  console.log('----------------------------------------------------');
  console.log(' CampusHire - Super Admin Registration & Login Utility');
  console.log('----------------------------------------------------');
  console.log(`Email:    ${email}`);
  console.log(`Name:     ${name}`);
  console.log(`Password: ${password}`);
  console.log('----------------------------------------------------');

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    // Create or update Super Admin user in PostgreSQL
    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        name,
        passwordHash,
        role: Role.SUPER_ADMIN,
        isActive: true,
      },
      create: {
        email: email.toLowerCase().trim(),
        name,
        passwordHash,
        role: Role.SUPER_ADMIN,
        isActive: true,
      },
    });

    // Generate valid JWT Session Token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(getJwtSecret());

    console.log('\n✅ SUPER ADMIN REGISTERED & VERIFIED IN DATABASE!');
    console.log(`User ID:  ${user.id}`);
    console.log(`Role:     ${user.role}`);
    console.log(`Status:   Active`);
    console.log('\n🔑 JWT Authorization Token (7-day validity):');
    console.log(token);
    console.log('\n----------------------------------------------------');
    console.log('💡 How to log in:');
    console.log('1. Go to http://localhost:3000/login');
    console.log(`2. Email:    ${email}`);
    console.log(`3. Password: ${password}`);
    console.log('----------------------------------------------------\n');
  } catch (err) {
    console.error('❌ Error creating Super Admin:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
