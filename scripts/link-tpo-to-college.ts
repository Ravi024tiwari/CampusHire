import { prisma } from '../lib/prisma';

async function linkTpo() {
  console.log('--- LINKING TPO USER TO GURU GHASIDAS UNIVERSITY ---');

  // 1. Find the TPO user (by email or role)
  const user = await prisma.user.findFirst({
    where: {
      email: 'ggu@gmail.com',
      role: 'TPO_ADMIN',
    },
  });

  if (!user) {
    console.error('Error: TPO user with email ggu@gmail.com not found.');
    return;
  }

  // 2. Find the College (by code or name)
  const college = await prisma.college.findFirst({
    where: {
      OR: [
        { code: 'GGU' },
        { name: { contains: 'Guru Ghasidas', mode: 'insensitive' } },
      ],
    },
  });

  if (!college) {
    console.error('Error: College GGU / Guru Ghasidas University not found.');
    return;
  }

  console.log(`Found User: ${user.name} (${user.id})`);
  console.log(`Found College: ${college.name} (${college.id})`);

  // 3. Upsert TpoProfile linking User -> College
  const tpoProfile = await prisma.tpoProfile.upsert({
    where: {
      userId: user.id,
    },
    create: {
      userId: user.id,
      collegeId: college.id,
      designation: 'Head, Training & Placement Cell',
      department: 'Central Placement Office',
      isActive: true,
    },
    update: {
      collegeId: college.id,
      designation: 'Head, Training & Placement Cell',
      department: 'Central Placement Office',
      isActive: true,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      college: {
        select: {
          id: true,
          name: true,
          code: true,
          domain: true,
        },
      },
    },
  });

  console.log('\n✅ Successfully linked TPO to College!');
  console.log({
    tpoProfileId: tpoProfile.id,
    userName: tpoProfile.user.name,
    userEmail: tpoProfile.user.email,
    collegeName: tpoProfile.college?.name,
    collegeCode: tpoProfile.college?.code,
    designation: tpoProfile.designation,
    department: tpoProfile.department,
  });
}

linkTpo()
  .catch((e) => {
    console.error('Failed to link TPO:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
