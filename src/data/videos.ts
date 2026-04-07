export interface Video {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  src: string;
  thumb: string;
  duration: number;
  addedAt: string;
  model: string;
}

export interface Category {
  count: number;
  name: string;
}

const sampleVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
];

const sampleThumbs = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
];

const modelNames = [
  "Adria Rae", "Agatha Vega", "Angel Gostosa", "Aria Lee", "Azul Hermosa",
  "Bailey Base", "Chanel Camryn", "Cherie DeVille", "Chloe Surreal", "Coco Lovelock",
  "Codi Vore", "Demi Hawks", "Eliza Ibarra", "Elsa Jean", "Emily Willis",
  "Emiri Momota", "Eva Elfie", "Eve Sweet", "Giana Dior", "Hailey Rose",
  "Hazel Moore", "Jia Lissa", "Julia James", "Katie Kush", "Kendra Spade",
  "Kimmy", "Kylie Rocket", "Lana Rhoades", "Lexi Lore", "Lilly Bell",
  "Liz Jordan", "Lulu Chu", "Megan Murkovski", "Molly Little", "Rae Lil Black",
  "Rikako Katayama", "Rissa May", "Ryan Reid", "Scarlett Alexis", "Scarlit Scandal",
  "Sonya Blaze", "Vanna Bardot", "Violet Gems", "Violet Myers", "Xxlayna Marie",
  "Alexis Love", "Katana Kombat", "Melanie Marie",
];

const titles = [
  "Runway Elegance", "Urban Chic Showcase", "Glamour Night", "Sunset Fashion",
  "Modern Muse Shoot", "Studio Couture", "Bold & Beautiful", "Street Style Edit",
  "Golden Hour Vibes", "Signature Look", "Timeless Beauty", "Fresh Wave",
  "Neon Nights", "Effortless Glow", "High Fashion Walk", "Crystal Clear",
  "Midnight Luxe", "Pure Radiance", "Fiesta Flair", "Campus Couture",
  "Crew Style", "Opulent Aura", "Statement Piece", "Silk & Satin",
  "Velvet Dreams", "Pastel Paradise", "Monochrome Magic", "Retro Glam",
  "Summer Vibes", "Winter Wonderland", "Spring Bloom", "Autumn Tones",
  "Diamond Edit", "Royal Fashion", "Boho Chic", "Minimalist Luxe",
  "Tropical Heat", "Arctic Elegance", "Desert Rose", "Ocean Breeze",
  "City Lights", "Garden Party", "Cocktail Hour", "Red Carpet",
  "Backstage Pass", "Front Row", "After Dark", "Morning Glow",
];

const categoryOptions = [
  "Urban Chic", "Wanderlust Wear", "Eastern Glow", "Starlight Glam",
  "Timeless Silhouettes", "Statement Style", "Midnight Luxe", "Campus Couture",
  "Effortless Chic", "Couture Classics", "Viral Trends", "Opulent Looks",
  "Runway Icons", "Pure Elegance", "Modern Muse", "Signature Look",
  "Gen Z Glam", "Fresh Wave", "Radiant Aura",
];

const tagOptions = [
  "FASHION", "GLAMOUR", "LIFESTYLE", "TRENDING", "PREMIUM", "4K",
  "EDITORIAL", "RUNWAY", "COUTURE", "STREET STYLE",
];

const durations = [180, 240, 300, 360, 420, 480, 540, 600, 720, 900];

export const videos: Video[] = modelNames.map((model, i) => ({
  id: `V${i + 1}`,
  title: titles[i % titles.length],
  categories: [categoryOptions[i % categoryOptions.length], categoryOptions[(i + 7) % categoryOptions.length]],
  tags: [tagOptions[i % tagOptions.length], tagOptions[(i + 3) % tagOptions.length]],
  src: sampleVideos[i % sampleVideos.length],
  thumb: sampleThumbs[i % sampleThumbs.length],
  duration: durations[i % durations.length],
  addedAt: new Date(2026, 2, 15 - (i % 30)).toISOString(),
  model,
}));

export const categories: Category[] = [
  { count: 1814, name: "Urban Chic" },
  { count: 832, name: "Wanderlust Wear" },
  { count: 117, name: "Eastern Glow" },
  { count: 1398, name: "Starlight Glam" },
  { count: 2173, name: "Timeless Silhouettes" },
  { count: 477, name: "Statement Style" },
  { count: 406, name: "Midnight Luxe" },
  { count: 172, name: "Campus Couture" },
  { count: 387, name: "Kinship Fashion" },
  { count: 490, name: "Squad Vibes" },
  { count: 436, name: "Effortless Chic" },
  { count: 165, name: "Glow Routines" },
  { count: 1252, name: "Couture Classics" },
  { count: 700, name: "Viral Trends" },
  { count: 554, name: "Opulent Looks" },
  { count: 75, name: "Fiesta Flair" },
  { count: 821, name: "Bonded Style" },
  { count: 262, name: "Family Glow" },
  { count: 1028, name: "Runway Icons" },
  { count: 430, name: "Pure Elegance" },
  { count: 733, name: "Modern Muse" },
  { count: 1283, name: "Signature Look" },
  { count: 644, name: "Gen Z Glam" },
  { count: 1700, name: "Crew Chic" },
  { count: 2411, name: "Fresh Wave" },
  { count: 624, name: "Radiant Aura" },
];

export const modelCodes: string[] = [
  "Adria Rae", "Agatha Vega", "Angel Gostosa", "Aria Lee", "Azul Hermosa",
  "Bailey Base", "Chanel Camryn", "Cherie DeVille", "Chloe Surreal", "Coco Lovelock",
  "Codi Vore", "Demi Hawks", "Eliza Ibarra", "Elsa Jean", "Emily Willis",
  "Emiri Momota", "Eva Elfie", "Eve Sweet", "Gianna Dior", "Hailey Rose",
  "Hazel Moore", "Jia Lissa", "Julia James", "Katana Kombat", "Katie Kush",
  "Kendra Spade", "Kimmy", "Kylie Rocket", "Lana Rhoades", "Lexi Lore",
  "Lilly Bell", "Liz Jordan", "Lulu Chu", "Megan Murkovski", "Melanie Marie",
  "Molly Little", "Rae Lil Black", "Rikako Katayama", "Riley Reid", "Rissa May",
  "Ryan Reid", "Scarlett Alexis", "Scarlit Scandal", "Sonya Blaze", "Vanna Bardot",
  "Violet Gems", "Violet Myers", "Xxlayna Marie",
];

export const filterTabs: string[] = [
  "All", "Indian", "Foreign", "Trending", "Premium", "4K", "New", "Popular", "Models",
];
