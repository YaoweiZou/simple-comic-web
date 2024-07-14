import { create } from "zustand";

export type ReadMode = "single" | "double" | "webtoon";

export type ReadOrder = "LTR" | "RTL";

export type Settings = {
  imagesInfo: ImageInfo[];
  currentPage: number;
  loading: boolean;
  readMode: ReadMode;
  readOrder: ReadOrder;
  zoom: number;
  pagesGap: boolean;
  showPicInfo: boolean;
  noiseReduction: boolean;
};

export interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

type SettingsAction = {
  updateImagesInfo: (imagesInfo: ImageInfo[]) => void;
  updateCurrentPage: (currentPage: number) => void;
  updateLoading: (loading: boolean) => void;
  updateReadMode: (readMode: ReadMode) => void;
  updateReadOrder: (readOrder: ReadOrder) => void;
  updateZoom: (zoom: number) => void;
  updatePagesGap: (pagesGap: boolean) => void;
  updateShowPicInfo: (showPicInfo: boolean) => void;
  updateNoiseReduction: (noiseReduction: boolean) => void;
};

export const useSettings = create<Settings & SettingsAction>()(set => ({
  imagesInfo: [],
  currentPage: 0,
  loading: false,
  readMode: "double",
  readOrder: "RTL",
  zoom: 100,
  pagesGap: false,
  showPicInfo: false,
  noiseReduction: false,
  updateImagesInfo: (imagesInfo: ImageInfo[]) => set({ imagesInfo }),
  updateCurrentPage: (currentPage: number) => set({ currentPage }),
  updateLoading: (loading: boolean) => set({ loading }),
  updateReadMode: (readMode: ReadMode) => set({ readMode }),
  updateReadOrder: (readOrder: ReadOrder) => set({ readOrder }),
  updateZoom: (zoom: number) => set({ zoom }),
  updatePagesGap: (pagesGap: boolean) => set({ pagesGap }),
  updateShowPicInfo: (showPicInfo: boolean) => set({ showPicInfo }),
  updateNoiseReduction: (noiseReduction: boolean) => set({ noiseReduction })
}));
