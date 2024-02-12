export default function ImagesView({
  state,
  dispatch
}: {
  state: {
    imageUrls: string[];
    pageIndex: number;
    readMode: "LTR" | "RTL";
    readOrder: "LTR" | "RTL";
  };
  dispatch: React.Dispatch<{ type: "NEXT_PAGE" | "PREV_PAGE" }>;
}) {
  const { imageUrls, pageIndex, readMode, readOrder } = state;

  const leftPageIndex = readMode === "LTR" ? pageIndex : pageIndex + 1;
  const rightPageIndex = readMode === "LTR" ? pageIndex + 1 : pageIndex;

  function handleWhell(e) {
    console.log(e);
  }

  function handleChangePage(page) {
    if ((page === "left" && readOrder === "RTL") || (page === "right" && readOrder === "LTR")) {
      dispatch({ type: "NEXT_PAGE" });
    } else {
      dispatch({ type: "PREV_PAGE" });
    }
  }

  return (
    <main className="h-[calc(100vh-55px)]" onWheel={handleWhell}>
      <div className="flex h-full select-none flex-row justify-center">
        <div className="w-1/2 flex-grow" onClick={() => handleChangePage("left")}>
          <img
            className="float-end h-full object-contain"
            src={imageUrls[leftPageIndex]}
            draggable={false}
          />
        </div>
        <div className="w-1/2 flex-grow" onClick={() => handleChangePage("right")}>
          <img
            className="float-start h-full object-contain"
            src={imageUrls[rightPageIndex]}
            draggable={false}
          />
        </div>
      </div>
    </main>
  );
}
