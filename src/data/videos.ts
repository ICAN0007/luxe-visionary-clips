import data from "./videos.json";
export type { Video, Category } from "./videos.d";

export const videos = data.videos;
export const categories = data.categories;
export const modelCodes: string[] = data.modelCodes;
export const filterTabs: string[] = data.filterTabs;
