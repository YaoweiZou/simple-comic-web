export default function ImagesView({ state, dispatch }) {
  const { imageUrls, pageIndex, readMode, readOrder } = state;

  const leftPageIndex = readMode === "LeftToRight" ? pageIndex : pageIndex + 1;
  const rightPageIndex = readMode === "LeftToRight" ? pageIndex + 1 : pageIndex;

  function handleWhell(e) {
    console.log(e);
  }

  function handleChangePage(page) {
    if (
      (page === "left" && readOrder === "RightToLeft") ||
      (page === "right" && readOrder === "LeftToRight")
    ) {
      dispatch({ type: "NEXT_PAGE" });
    } else {
      dispatch({ type: "PREV_PAGE" });
    }
  }

  return (
    <main className="h-[calc(100%-55px)]" onWheel={handleWhell}>
      <div className="flex flex-row justify-center h-full">
        <div className="flex flex-row justify-start " onClick={() => handleChangePage("left")}>
          <img
            className="object-contain select-none cursor-w-resize"
            src={imageUrls[leftPageIndex]}
            alt=""
          />
        </div>
        <div
          className="flex flex-row justify-end cursor-e-resize"
          onClick={() => handleChangePage("right")}
        >
          <img className="object-contain select-none" src={imageUrls[rightPageIndex]} alt="" />
        </div>
      </div>
    </main>
  );
}
