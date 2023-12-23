import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // hash the passwords
  const passwordCharlotte = await bcrypt.hash('12345678', 10);
  const passwordPeter = await bcrypt.hash('password', 10);

  // products array
  const productsArray = [
    {
      name: 'Watercolour set "White Nights", 24 colours, tubes (10 ml), cardboard box',
      brand: 'Nevskaya Palitra',
      category: "Watercolours",
      description: 'Extra fine professional watercolour set. High concentration of pigments and vibrant colours.',
      image: 'https://www.nevskayapalitra.ru/timthumb.php?src=/upload/iblock/3b0/19411228%20(1).jpg&w=1000&h=1000&zc=2&cc=fff&q=90',
      price: 33.4,
      in_stock: 20
    },
    {
      name: 'Watercolour pencils set "White Nights", 24 colours, tin box',
      brand: 'Nevskaya Palitra',
      category: 'Watercolour pencils',
      description: 'Perfectly combining the properties of watercolour paint and colour pencils, these high-quality White Nights watercolour pencils are developed with professional artists, designers and illustrators in mind.',
      price: 13.20,
      in_stock: 32
    },
    {
      name: 'Oil set "Master-Class", 12 colours, tubes (18 ml), cardboard box',
      brand: 'Nevskaya Palitra',
      category: 'Oils',
      description: 'The Master-Class artist oil paints are finely diluted paste blends of pigments and binders, made using specially prepared oils. The most important ingredients of the mixtures are the natural resins, which positively affect the properties of the colours.',
      image: 'https://www.nevskayapalitra.ru/timthumb.php?src=/upload/iblock/3ba/1141001.png&w=700&h=600&zc=2&cc=fff&q=90',
      price: 33.90,
      in_stock: 8
    },
    {
      name: 'Tempera set "Master-Class" 12 colours, tubes (18 ml), cardboard box',
      brand: 'Nevskaya Palitra',
      category: 'Tempera',
      description: 'Artist grade tempera paints Master-Class by Nevskaya Palitra are made on the basis of organic and inorganic pigments and vinyl acetate dispersion and are a traditional material for painting.',
      image: 'https://www.nevskayapalitra.ru/timthumb.php?src=/upload/iblock/47b/1641007%20%281%29.png&w=700&h=600&zc=2&cc=fff&q=90',
      price: 22.80,
      in_stock: 4
    },
    {
      name: 'Watercolour set "Studio", 12 colours, cuvettes (2.6 ml), cardboard box',
      brand: 'Gamma',
      category: 'Watercolours',
      description: 'Gamma watercolours in cuvettes are perfect for beginners and students.',
      image: 'https://artgamma.ru/data/images/catalog/id_597.jpg',
      price: 4.00,
      in_stock: 40
    },
    {
      name: 'Watercolour set "Studio", 18 colours, cuvettes (2.6 ml), cardboard box',
      brand: 'Gamma',
      category: 'Watercolours',
      description: 'Gamma watercolours in cuvettes are perfect for beginners and students.',
      image: 'https://artgamma.ru/data/images/catalog/id_599.jpg',
      price: 4.90,
      in_stock: 36
    },
    {
      name: 'Set of graphite pencils, 1502 ART, 8B-2H, 12pcs, tin box',
      brand: 'KOH-I-NOOR',
      category: 'Graphite pencils',
      description: 'Set of traditional yellow graphite pencils 1502 ART - soft classes. The hexagonal graphite pencils in wooden cedar envelope. The pencils are used for graphic designers and artists for drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/89707_1502012008PL.JPG',
      price: 14.6,
      in_stock: 30
    },
    {
      name: 'Set of graphite pencils, 1912 ART, 8B-2H, 12pcs, tin box',
      brand: 'KOH-I-NOOR',
      category: 'Graphite pencils',
      description: 'A set of graphite pencils 1912 ART - soft and hard classes. Hexagonal graphite pencils, in black matt design. The pencils are used for graphic designers, artists, and technicians.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/141258_1912012001PL.JPG',
      price: 19.7,
      in_stock: 10
    },
    {
      name: `Set of artists' oil paints Manes, 10 colours, tubes (16 ml), cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Oils',
      description: 'Mánes oil paint for painters is recommended as a study material for people interested in oil painting, for hobby painting, e.g. colouring of wooden figures etc.',
      price: 34.80,
      in_stock: 25
    },
    {
      name: `Set of artists' acrylic paints, 10 colours, tubes (16 ml), cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Acrylics',
      description: 'High-quality water-soluble acrylic paints. They can be applied using a brush, roller or spatula on any non-greasy base. These paints also have high pigment content and are excellent colour lightfastness.',
      price: 23.10,
      in_stock: 2
    },
    {
      name: `Set of watercolour pencils 3718 FRUIT, 24 colours, cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Watercolour pencils',
      description: 'Crayons are hexagonal OK - 7 mm, lead with a diameter of 3,8 mm. They are characterized by rich mark and can be further modified with water by using a brush or sponge. Suitable for artistic and hobby drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/45567_3718024001KS.JPG',
      price: 17.30,
      in_stock: 25
    },
    {
      name: `Set of watercolour pencils 3719 FRUIT, 36 colours, cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Watercolour pencils',
      description: 'Crayons are hexagonal OK - 7 mm, lead with a diameter of 3,8 mm. They are characterized by rich mark and can be further modified with water by using a brush or sponge. Suitable for artistic and hobby drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/45566_3719036001KZ.JPG',
      price: 28.50,
      in_stock: 12
    },
    {
      name: `Set of watercolour pencils 3715 FISH, 6 colours, cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Watercolour pencils',
      description: 'Coloured pencils are hexagonal, they are characterized by rich mark and can be further modified with water by using a brush or sponge. Suitable for artistic and hobby drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/120754_3715006004KS.JPG',
      price: 2.15,
      in_stock: 16
    },
    {
      name: `Set of watercolour pencils 3717 FISH, 18 colours, cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Watercolour pencils',
      description: 'Coloured pencils are hexagonal, they are characterized by rich mark and can be further modified with water by using a brush or sponge. Suitable for artistic and hobby drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/120756_3717018004KS.JPG',
      price: 5.50,
      in_stock: 28
    },
    {
      name: `Set of watercolour pencils 3718 FISH, 24 colours, cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Watercolour pencils',
      description: 'Coloured pencils are hexagonal, they are characterized by rich mark and can be further modified with water by using a brush or sponge. Suitable for artistic and hobby drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/120759_3718024004KS.JPG',
      price: 7.77,
      in_stock: 14
    },
    {
      name: `Set of watercolour pencils 3719 FISH, 36 colours, cardboard box`,
      brand: 'KOH-I-NOOR',
      category: 'Watercolour pencils',
      description: 'Coloured pencils are hexagonal, they are characterized by rich mark and can be further modified with water by using a brush or sponge. Suitable for artistic and hobby drawing.',
      image: 'https://catalogue.koh-i-noor.cz/Pictures/KIN/19/2000000325/33416_3719036004KS.JPG',
      price: 11.52,
      in_stock: 14
    }
  ];

  // add products
  const products = await prisma.product.createMany({
    data: productsArray,
    skipDuplicates: true,
  })
  
  // create two users
  const user1 = await prisma.user.upsert({
    where: { username: 'lottie25' },
    update: {},
    create: {
      username: 'lottie25',
      password: passwordCharlotte,
      name: 'Charlotte Gardener'
    },
  });
  const user2 = await prisma.user.upsert({
    where: { username: 'pete78' },
    update: {},
    create: {
      username: 'pete78',
      password: passwordPeter,
      name: 'Peter Baker'
    },
  });

  console.log({ products, user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });