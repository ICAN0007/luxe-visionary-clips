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

export interface VideoData {
  videos: Video[];
  categories: Category[];
  modelCodes: string[];
  filterTabs: string[];
}
