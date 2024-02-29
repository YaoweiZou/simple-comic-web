export type PageView = "single" | "double" | "webtoon";

export type ReadMode = "ltr" | "rtl";

export interface AppSettings {
  pageView: PageView;
  readMode: ReadMode;
  pagesGap: boolean;
  showPicInfo: boolean;
  noiseReduction: boolean;
}

export const defaultAppSettings: AppSettings = {
  pageView: "double",
  readMode: "rtl",
  pagesGap: false,
  showPicInfo: false,
  noiseReduction: false
};
