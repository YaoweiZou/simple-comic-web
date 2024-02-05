export default function ImagesView({ state, dispatch }) {
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
    <main className="h-[calc(100%-55px)]" onWheel={handleWhell}>
      <div className="flex h-full flex-row justify-center">
        <div className="flex flex-row justify-start" onClick={() => handleChangePage("left")}>
          <img className="select-none object-contain" src={imageUrls[leftPageIndex]} alt="" />
        </div>
        <div className="flex flex-row justify-end" onClick={() => handleChangePage("right")}>
          <img className="select-none object-contain" src={imageUrls[rightPageIndex]} alt="" />
        </div>
      </div>
    </main>
  );
}
