import data from "./videos.json";

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

export const videos: Video[] = data.videos;
export const categories = data.categories;
export const modelCodes: string[] = data.modelCodes;
export const filterTabs: string[] = data.filterTabs;
