export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  sport: string[];     // e.g., 'Boxing', 'MMA', 'Muay Thai', 'Jiu-Jitsu'
  bodyPart: string[];  // e.g., 'Head', 'Hands', 'Body', 'Legs', 'Groin'
  equipment?: string[]; // e.g., 'Heavy Bag', 'Focus Mitts', 'Jump Rope'
  image: string;
  isNew: boolean;
  description?: string;
  options?: { title: string; choices: string[] }[]; // Dynamic product options (sizes, types)
};

export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Pro Sparring Gloves',
    category: 'Gloves',
    price: 120.00,
    sport: ['Boxing', 'Muay Thai'],
    bodyPart: ['Hands'],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1974&auto=format&fit=crop',
    isNew: true,
    description: '최고급 천연 소가죽으로 제작되어 타격감과 손목 보호력이 우수합니다.',
    options: [
      { title: '무게(Size)', choices: ['8oz', '10oz', '12oz', '14oz', '16oz'] },
      { title: '컬러(Color)', choices: ['Matte Black', 'Crimson Red', 'Neon Night'] }
    ]
  },
  {
    id: 'p-2',
    name: 'Elite MMA Grappling Gloves',
    category: 'Gloves',
    price: 75.00,
    sport: ['MMA'],
    bodyPart: ['Hands'],
    image: 'https://images.unsplash.com/photo-1590483736622-398541ce1ea8?q=80&w=1968&auto=format&fit=crop',
    isNew: false,
  },
  {
    id: 'p-3',
    name: 'Premium Combat Headgear',
    category: 'Protective Gear',
    price: 90.00,
    sport: ['Boxing', 'MMA', 'Muay Thai'],
    bodyPart: ['Head'],
    image: 'https://images.unsplash.com/photo-1610479133405-bce1dc5deef6?q=80&w=1974&auto=format&fit=crop',
    isNew: false,
    description: '충격 흡수 폼 탑재. 시야 확보와 완벽한 방어력을 동시에 제공합니다.',
    options: [
      { title: '보호 형태(Style)', choices: ['오픈페이스(일반)', 'T자형(코보호)', '풀페이스(안면보호)'] },
      { title: '사이즈(Size)', choices: ['S', 'M', 'L', 'XL'] }
    ]
  },
  {
    id: 'p-4',
    name: 'Heavy Duty Shin Guards',
    category: 'Protective Gear',
    price: 65.00,
    sport: ['Muay Thai', 'MMA'],
    bodyPart: ['Legs'],
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1974&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 'p-5',
    name: 'Competition BJJ Gi',
    category: 'Apparel',
    price: 150.00,
    sport: ['Jiu-Jitsu'],
    bodyPart: ['Body', 'Legs'],
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&grayscale&w=1974&auto=format&fit=crop',
    isNew: false,
  },
  {
    id: 'p-6',
    name: 'Carbon Groin Protector',
    category: 'Protective Gear',
    price: 45.00,
    sport: ['Boxing', 'MMA', 'Muay Thai'],
    bodyPart: ['Groin'],
    image: 'https://images.unsplash.com/photo-1605333556559-6e3e1f0e4b78?q=80&w=1974&auto=format&fit=crop',
    isNew: false,
  },
  {
    id: 'p-7',
    name: 'Pro Heavy Punching Bag (100lb) - Octagon Series',
    category: 'Training Tool',
    price: 220.00,
    sport: ['Boxing', 'MMA', 'Muay Thai'],
    bodyPart: [],
    equipment: ['Heavy Bag'],
    image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2000&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 'p-8',
    name: 'Speed Jump Rope',
    category: 'Training Tool',
    price: 25.00,
    sport: ['Boxing', 'MMA'],
    bodyPart: [],
    equipment: ['Jump Rope'],
    image: 'https://images.unsplash.com/photo-1650390161421-aa0029b9e6fa?q=80&w=1974&auto=format&fit=crop',
    isNew: false,
  }
];

export const SPORTS = ['Boxing', 'MMA', 'Muay Thai', 'Jiu-Jitsu'];
export const BODY_PARTS = ['Head', 'Hands', 'Body', 'Legs', 'Groin'];
export const EQUIPMENTS = ['Heavy Bag', 'Focus Mitts', 'Jump Rope', 'Resistance Band'];
