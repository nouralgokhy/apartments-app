import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

console.log("here!")

async function main() {
  const existing = await prisma.project.count();
  if (existing > 0) {
    console.log('Database already seeded. Skipping.');
    return;
  }

  await prisma.project.createMany({
    data: [
      { id: 1, name: 'Mountain View Ras El Hekma', location: 'North Coast' },
      { id: 2, name: 'Marassi', location: 'Sidi Abd ElRahman' },
      { id: 3, name: 'Sodic EAST', location: 'New Cairo' },
      { id: 4, name: 'Mivida', location: '5th Settlement' },
      { id: 5, name: 'The Waterway', location: 'New Cairo' },
    ],
  });

 
  await prisma.apartment.createMany({
    data: [
      {
        id: 1,
        name: 'Cozy Apartment',
        unitNumber: 'A101',
        price: 12000000,
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        projectId: 1,
      },
      {
        id: 2,
        name: 'Sea View Apartment',
        unitNumber: 'B202',
        price: 25000000,
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        projectId: 2,
      },
      {
        id: 3,
        name: 'Modern Studio',
        unitNumber: 'C303',
        price: 18000000,
        bedrooms: 1,
        bathrooms: 1,
        area: 60,
        projectId: 3,
      },
      {
        id: 4,
        name: 'Luxury Villa',
        unitNumber: 'D404',
        price: 50000000,
        bedrooms: 4,
        bathrooms: 3,
        area: 300,
        projectId: 4,
      },
      {
        id: 5,
        name: 'Family Apartment',
        unitNumber: 'E505',
        price: 22000000,
        bedrooms: 3,
        bathrooms: 2,
        area: 130,
        projectId: 5,
      },
    ],
  });


  await prisma.image.createMany({
    data: [
      { apartmentId: 1, url: 'https://i.pinimg.com/1200x/85/3e/84/853e843ec5c068fb3678b1e00f2942f6.jpg' },
      { apartmentId: 1, url: 'https://i.pinimg.com/1200x/79/79/78/797978be8b13d67ebd16dac78552b39f.jpg' },
      { apartmentId: 2, url: 'https://i.pinimg.com/1200x/f6/e2/86/f6e2863c59f7089b3415ebc1cb3e170a.jpg' },
      { apartmentId: 2, url: 'https://i.pinimg.com/1200x/f6/e2/86/f6e2863c59f7089b3415ebc1cb3e170a.jpg' },
      { apartmentId: 3, url: 'https://i.pinimg.com/1200x/d6/a6/85/d6a685992619668e216e616646ffd7e2.jpg' },
      { apartmentId: 4, url: 'https://i.pinimg.com/1200x/3f/34/2a/3f342a3254ed26d8681774b424dedf0b.jpg' },
      { apartmentId: 4, url: 'https://i.pinimg.com/736x/86/dd/85/86dd85f606d59b007b87854bb31fa19a.jpg' },
      { apartmentId: 4, url: 'https://i.pinimg.com/736x/53/00/e2/5300e20c0a48c9c80bdcc83346c91872.jpg' },
      { apartmentId: 5, url: 'https://i.pinimg.com/1200x/12/57/9e/12579e752af87222552fcbe1ebe1ae36.jpg' },
      { apartmentId: 5, url: 'https://i.pinimg.com/1200x/58/54/d9/5854d955a4cf0507c0f7c6436be33c15.jpg' },
      { apartmentId: 5, url: 'https://i.pinimg.com/1200x/fd/e2/25/fde225b5f0daf2a0e3abd2547275cf17.jpg' },
    ],
  });

  console.log('Seed completed ');
  await prisma.$executeRawUnsafe(`
    SELECT setval(
      pg_get_serial_sequence('"Apartment"', 'id'),
      (SELECT COALESCE(MAX(id), 0) FROM "Apartment")
    )
  `);
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
