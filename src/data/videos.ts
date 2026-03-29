export interface Video {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  src: string;
  thumb: string;
  duration: number;
  addedAt: string;
}

export const videos: Video[] = [
  { id: "v1", title: "Glamour Session Vol. 1", categories: ["Indian"], tags: ["#Fashion", "#Glamour"], src: "https://files.catbox.moe/ydxh68.mp4", thumb: "https://files.catbox.moe/x13o1w.png", duration: 900, addedAt: "2025-07-25T07:33:00Z" },
  { id: "v2", title: "Eastern Elegance", categories: ["Indian"], tags: ["#Luxury", "#Style"], src: "https://files.catbox.moe/7dt5ce.mp4", thumb: "https://files.catbox.moe/4v4vcn.png", duration: 900, addedAt: "2025-07-25T00:17:00Z" },
  { id: "v3", title: "Silk & Satin Dreams", categories: ["Indian"], tags: ["#Fashion", "#Travel"], src: "https://files.catbox.moe/iidf41.mp4", thumb: "https://files.catbox.moe/7xjtwb.png", duration: 1200, addedAt: "2025-07-25T00:18:00Z" },
  { id: "v4", title: "Golden Hour Vibes", categories: ["Indian"], tags: ["#Lifestyle", "#Glamour"], src: "https://files.catbox.moe/iipfhl.mp4", thumb: "https://files.catbox.moe/rhrtox.png", duration: 600, addedAt: "2025-07-25T00:18:00Z" },
  { id: "v5", title: "Runway Ready", categories: ["Indian"], tags: ["#Fashion", "#Premium"], src: "https://files.catbox.moe/d583aq.mp4", thumb: "https://files.catbox.moe/5a0wa0.png", duration: 900, addedAt: "2025-07-25T00:21:00Z" },
  { id: "v6", title: "Opulent Nights", categories: ["Indian"], tags: ["#Luxury", "#Glamour"], src: "https://files.catbox.moe/v80cm0.mp4", thumb: "https://files.catbox.moe/jr0udr.png", duration: 1200, addedAt: "2025-07-25T00:22:00Z" },
  { id: "v7", title: "Couture Collection", categories: ["Indian"], tags: ["#Fashion", "#Style"], src: "https://files.catbox.moe/o4aqqn.mp4", thumb: "https://files.catbox.moe/7pde9k.png", duration: 600, addedAt: "2025-07-25T07:32:00Z" },
  { id: "v8", title: "Starlight Moments", categories: ["Indian"], tags: ["#Travel", "#Luxury"], src: "https://files.catbox.moe/ydxh68.mp4", thumb: "https://files.catbox.moe/x13o1w.png", duration: 900, addedAt: "2025-07-25T07:33:00Z" },
  { id: "v9", title: "Velvet Dreams", categories: ["Indian"], tags: ["#Fashion", "#Glamour"], src: "https://files.catbox.moe/boavf6.mp4", thumb: "https://files.catbox.moe/mrqjg9.png", duration: 1200, addedAt: "2025-07-25T07:33:00Z" },
  { id: "v10", title: "Chic Horizon", categories: ["Indian"], tags: ["#Lifestyle", "#Style"], src: "https://files.catbox.moe/pvqa6t.mp4", thumb: "https://files.catbox.moe/kerdiv.png", duration: 600, addedAt: "2025-07-25T07:33:00Z" },
  { id: "v11", title: "Midnight Bloom", categories: ["Indian"], tags: ["#Fashion", "#Premium"], src: "https://files.catbox.moe/yrm7s4.mp4", thumb: "https://files.catbox.moe/ss5qe5.png", duration: 900, addedAt: "2025-07-25T07:34:00Z" },
  { id: "v12", title: "Ethereal Glow", categories: ["Indian"], tags: ["#Glamour", "#Luxury"], src: "https://files.catbox.moe/6lqsmn.mp4", thumb: "https://files.catbox.moe/u2688e.png", duration: 1200, addedAt: "2025-07-25T07:34:00Z" },
  { id: "v13", title: "Pure Radiance", categories: ["Indian"], tags: ["#Fashion", "#Travel"], src: "https://files.catbox.moe/j0d81n.mp4", thumb: "https://files.catbox.moe/0wq6h0.png", duration: 600, addedAt: "2025-07-25T07:35:00Z" },
  { id: "v14", title: "Luxe Affair", categories: ["Indian"], tags: ["#Style", "#Glamour"], src: "https://files.catbox.moe/b509au.mp4", thumb: "https://files.catbox.moe/546n1m.png", duration: 900, addedAt: "2025-07-25T07:35:00Z" },
  { id: "v15", title: "Timeless Grace", categories: ["Indian"], tags: ["#Fashion", "#Luxury"], src: "https://files.catbox.moe/iwoz9m.mp4", thumb: "https://files.catbox.moe/kba309.png", duration: 1200, addedAt: "2025-07-25T07:35:00Z" },
  { id: "v16", title: "Signature Style", categories: ["Indian"], tags: ["#Premium", "#Glamour"], src: "https://files.catbox.moe/r5pklt.mp4", thumb: "https://files.catbox.moe/zqma0e.png", duration: 600, addedAt: "2025-07-25T07:35:00Z" },
  { id: "v17", title: "Fashion Forward", categories: ["Indian"], tags: ["#Fashion", "#Style"], src: "https://files.catbox.moe/q39glk.mp4", thumb: "https://files.catbox.moe/zqma0e.png", duration: 900, addedAt: "2025-07-25T07:35:00Z" },
  { id: "v18", title: "Crimson Elegance", categories: ["Indian"], tags: ["#Luxury", "#Travel"], src: "https://files.catbox.moe/py6en3.mp4", thumb: "https://files.catbox.moe/iz1psz.png", duration: 1200, addedAt: "2025-07-25T07:36:00Z" },
  { id: "v19", title: "Dusk Couture", categories: ["Indian"], tags: ["#Glamour", "#Fashion"], src: "https://files.catbox.moe/nneaqu.mp4", thumb: "https://files.catbox.moe/fxv6wv.png", duration: 600, addedAt: "2025-07-25T07:36:00Z" },
  { id: "v20", title: "Modern Muse", categories: ["Indian"], tags: ["#Style", "#Premium"], src: "https://files.catbox.moe/u9slu4.mp4", thumb: "https://files.catbox.moe/kq1vxn.png", duration: 900, addedAt: "2025-07-25T07:36:00Z" },
];

export const categories = [
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

export const modelCodes = [
  "AR", "AH", "CD", "CV", "EJ", "EE", "HR", "JJ", "KS", "LR", "LJ", "MM", "RK", "RR", "VB", "XL",
  "AV", "BB", "CS", "DH", "EW", "ES", "HM", "KK", "KM", "LL", "LC", "ML", "RR", "SA", "VG",
  "AL", "CC", "CL", "EI", "EM", "GD", "JL", "KK", "KR", "LB", "MM", "RL", "RM", "SB", "VM"
];

export const filterTabs = ["All", "Indian", "Foreign", "Trending", "Premium", "4K", "New", "Popular", "Models"];
