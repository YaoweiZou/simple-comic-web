export interface AppSettings {
  pageView: "single" | "double" | "scroll";
  readMode: "ltr" | "rtl" | "webtoon";
  showPicInfo: boolean;
  noiseReduction: boolean;
}

export const defaultAppSettings: AppSettings = {
  pageView: "double",
  readMode: "rtl",
  showPicInfo: false,
  noiseReduction: false
};
