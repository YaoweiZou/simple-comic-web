import React, { useContext } from "react";
import { AppSettingsContext } from "./AppSettingsProvider";

export default function ImagesView() {
  const { imagesInfo, appSettings, pageIndex, updatePageIndex } = useContext(AppSettingsContext);

  const { pageView, readMode } = appSettings;

  const leftPage = readMode === "ltr" ? imagesInfo[pageIndex] : imagesInfo[pageIndex + 1];
  const rightPage = readMode === "ltr" ? imagesInfo[pageIndex + 1] : imagesInfo[pageIndex];

  function whellEventHandle(e: React.WheelEvent<HTMLDivElement>) {
    console.log(e);
  }

  function handleChangePage(page: "left" | "right") {
    if ((page === "left" && readMode === "rtl") || (page === "right" && readMode === "ltr")) {
      updatePageIndex(pageIndex + (pageView === "single" ? 1 : 2));
    } else {
      updatePageIndex(pageIndex - (pageView === "single" ? 1 : 2));
    }
  }

  return (
    <main className="h-[calc(100vh-55px)]" onWheel={whellEventHandle}>
      <div className="flex h-full select-none flex-row justify-center">
        <div className="w-1/2 flex-grow" onClick={() => handleChangePage("left")}>
          <img className="float-end h-full object-contain" src={leftPage?.url} draggable={false} />
        </div>
        <div className="w-1/2 flex-grow" onClick={() => handleChangePage("right")}>
          <img
            className="float-start h-full object-contain"
            src={rightPage?.url}
            draggable={false}
          />
        </div>
      </div>
    </main>
  );
}
