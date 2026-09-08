import { prisma } from '../lib/prisma';

async function main() {
  console.log('--- CHECKING COLLEGES ---');
  const colleges = await prisma.college.findMany({
    include: {
      tpos: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
        },
      },
      _count: {
        select: {
          students: true,
          jobs: true,
          tpos: true,
        },
      },
    },
  });

  console.log(`Found ${colleges.length} college(s):`);
  colleges.forEach((col, idx) => {
    console.log(`\nCollege #${idx + 1}:`);
    console.log(`  ID: ${col.id}`);
    console.log(`  Name: ${col.name}`);
    console.log(`  Code: ${col.code}`);
    console.log(`  Domain: ${col.domain}`);
    console.log(`  City/State: ${col.city}, ${col.state}`);
    console.log(`  Created By User ID: ${col.createdById}`);
    console.log(`  TPOs Assigned Count: ${col.tpos.length}`);
    if (col.tpos.length > 0) {
      col.tpos.forEach((t, tIdx) => {
        console.log(`    - TPO #${tIdx + 1}: ${t.user?.name} (${t.user?.email}) | Designation: ${t.designation} | Dept: ${t.department}`);
      });
    } else {
      console.log('    - [WARNING] No TPO assigned to this college!');
    }
  });

  console.log('\n--- CHECKING ALL TPO_ADMIN USERS & TPO PROFILES ---');
  const tpoUsers = await prisma.user.findMany({
    where: {
      role: 'TPO_ADMIN',
    },
    include: {
      tpo: {
        include: {
          college: true,
        },
      },
    },
  });

  console.log(`Found ${tpoUsers.length} user(s) with role TPO_ADMIN:`);
  tpoUsers.forEach((u, idx) => {
    console.log(`\nTPO User #${idx + 1}:`);
    console.log(`  ID: ${u.id}`);
    console.log(`  Name: ${u.name}`);
    console.log(`  Email: ${u.email}`);
    console.log(`  Is Active: ${u.isActive}`);
    if (u.tpo) {
      console.log(`  TpoProfile ID: ${u.tpo.id}`);
      console.log(`  Designation: ${u.tpo.designation}`);
      console.log(`  Department: ${u.tpo.department}`);
      console.log(`  Assigned College ID: ${u.tpo.collegeId || 'None (null)'}`);
      if (u.tpo.college) {
        console.log(`  Assigned College Name: ${u.tpo.college.name} (${u.tpo.college.code})`);
      } else {
        console.log(`  [ALERT] TPO profile exists but NO college is linked (collegeId is null or invalid)!`);
      }
    } else {
      console.log(`  [ALERT] User has role TPO_ADMIN but NO TpoProfile record exists in the database!`);
    }
  });

  console.log('\n--- CHECKING UNLINKED TPO PROFILES ---');
  const allTpoProfiles = await prisma.tpoProfile.findMany({
    include: {
      user: true,
      college: true,
    },
  });
  console.log(`Total TpoProfile records in database: ${allTpoProfiles.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
