import { Settings } from "@/store/settings";
import { ReactNode, createContext, useState } from "react";

const defaultAppSettings: Settings = {
  imagesInfo: [],
  currentPage: 0,
  loading: false,
  readMode: "double",
  readOrder: "RTL",
  zoom: 100,
  pagesGap: false,
  showPicInfo: false,
  noiseReduction: false
};

export const AppSettingsContext = createContext<AppState>({
  imagesInfo: [],
  updateImagesInfo: () => {},
  pageIndex: 0,
  updatePageIndex: () => {},
  loading: false,
  updateLoading: () => {},
  appSettings: {
    ...defaultAppSettings
  },
  updateAppSettings: () => {}
});

export interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

interface AppState {
  imagesInfo: ImageInfo[];
  updateImagesInfo: (imagesInfo: ImageInfo[]) => void;
  pageIndex: number;
  updatePageIndex: (pageIndex: number) => void;
  loading: boolean;
  updateLoading: (loading: boolean) => void;
  appSettings: Settings;
  updateAppSettings: (settings: Settings) => void;
}

export default function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [imagesInfo, setImagesInfo] = useState<ImageInfo[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateImagesInfo = (imagesInfo: ImageInfo[]) => {
    setImagesInfo(imagesInfo);
  };

  const updatePageIndex = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= imagesInfo.length) return;
    setPageIndex(pageIndex);
  };

  const updateLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const [appSettings, setAppSettings] = useState<Settings>({ ...defaultAppSettings });

  const updateAppSettings = (settings: Settings) => {
    setAppSettings(settings);
  };

  const contextValue = {
    imagesInfo,
    updateImagesInfo,
    pageIndex,
    updatePageIndex,
    loading,
    updateLoading,
    appSettings,
    updateAppSettings
  };

  return <AppSettingsContext.Provider value={contextValue}>{children}</AppSettingsContext.Provider>;
}
