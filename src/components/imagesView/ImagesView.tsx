import { useSettings } from "@/store/settings";
import React from "react";

export default function ImagesView() {
  // const { imagesInfo, appSettings, pageIndex, updatePageIndex } = useContext(AppSettingsContext);
  const { imagesInfo, currentPage, readMode, readOrder, updateCurrentPage } = useSettings();

  // const { pageView, readMode } = appSettings;

  const leftPage = readOrder === "LTR" ? imagesInfo[currentPage] : imagesInfo[currentPage + 1];
  const rightPage = readOrder === "LTR" ? imagesInfo[currentPage + 1] : imagesInfo[currentPage];

  function wheelEventHandle(e: React.WheelEvent<HTMLDivElement>) {
    console.log(e);
  }

  function handleChangePage(page: "left" | "right") {
    if ((page === "left" && readOrder === "RTL") || (page === "right" && readOrder === "LTR")) {
      updateCurrentPage(currentPage + (readMode === "single" ? 1 : 2));
    } else {
      updateCurrentPage(currentPage - (readMode === "single" ? 1 : 2));
    }
  }

  return (
    <main className="h-[calc(100vh-55px)]" onWheel={wheelEventHandle}>
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
