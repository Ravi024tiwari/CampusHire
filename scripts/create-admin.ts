import { config } from 'dotenv';
config(); // Load .env

import readline from 'readline';
import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '../src/generated/prisma';

const prisma = new PrismaClient();

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function parseArgs(): { email?: string; password?: string; name?: string; secret?: string } {
  const args = process.argv.slice(2);
  const result: { email?: string; password?: string; name?: string; secret?: string } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--email' || arg === '-e') {
      result.email = args[++i];
    } else if (arg === '--password' || arg === '-p') {
      result.password = args[++i];
    } else if (arg === '--name' || arg === '-n') {
      result.name = args[++i];
    } else if (arg === '--secret' || arg === '-s') {
      result.secret = args[++i];
    }
  }

  return result;
}

async function main() {
  console.log('\n========================================');
  console.log('   CampusHire Protected Admin Setup     ');
  console.log('========================================\n');

  // 1. Guard check with ADMIN_SECRET_KEY from .env
  const configuredSecret = process.env.ADMIN_SECRET_KEY;
  if (!configuredSecret) {
    console.error('❌ SECURITY ERROR: "ADMIN_SECRET_KEY" is not configured in your .env file.');
    console.error('Please add ADMIN_SECRET_KEY="your-secret-passkey" in .env before running this setup.\n');
    process.exit(1);
  }

  const args = parseArgs();

  // 2. Verify Passkey
  let enteredSecret = args.secret;
  if (!enteredSecret) {
    enteredSecret = await prompt('Enter ADMIN_SECRET_KEY to verify authorization: ');
  }

  if (enteredSecret !== configuredSecret) {
    console.error('\n❌ ACCESS DENIED: Invalid Admin Secret Key. Unauthorized attempt blocked.\n');
    process.exit(1);
  }

  console.log('✅ Authorization verified.\n');

  let email = args.email;
  let name = args.name;
  let password = args.password;

  if (!email) {
    email = await prompt('Enter Super Admin Email [admin@campushire.com]: ');
    if (!email) email = 'admin@campushire.com';
  }

  if (!name) {
    name = await prompt('Enter Super Admin Name [Platform Administrator]: ');
    if (!name) name = 'Platform Administrator';
  }

  if (!password) {
    password = await prompt('Enter Super Admin Password [min 6 chars]: ');
  }

  if (!password || password.length < 6) {
    console.error('\n❌ Error: Password must be at least 6 characters long.\n');
    process.exit(1);
  }

  const normalizedEmail = email.toLowerCase().trim();

  console.log(`\n⏳ Setting up Super Admin account for "${normalizedEmail}"...`);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {
        name,
        role: Role.SUPER_ADMIN,
        passwordHash,
        isActive: true,
      },
      create: {
        email: normalizedEmail,
        name,
        role: Role.SUPER_ADMIN,
        passwordHash,
        isActive: true,
      },
    });

    console.log('\n========================================');
    console.log('  ✅ SUPER ADMIN CONFIGURED SUCCESSFULLY! ');
    console.log('========================================');
    console.log(`  User ID : ${user.id}`);
    console.log(`  Name    : ${user.name}`);
    console.log(`  Email   : ${user.email}`);
    console.log(`  Role    : ${user.role}`);
    console.log(`  Status  : ${user.isActive ? 'ACTIVE' : 'INACTIVE'}`);
    console.log('========================================\n');
  } catch (error: any) {
    console.error('\n❌ Failed to setup Super Admin:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
