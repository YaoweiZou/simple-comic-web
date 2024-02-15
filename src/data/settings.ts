export type pageView = "single" | "double" | "scroll";

export type readMode = "ltr" | "rtl" | "webtoon";

export interface AppSettings {
  pageView: pageView;
  readMode: readMode;
  showPicInfo: boolean;
  noiseReduction: boolean;
}

export const defaultAppSettings: AppSettings = {
  pageView: "double",
  readMode: "rtl",
  showPicInfo: false,
  noiseReduction: false
};
