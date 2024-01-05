export default function ImagesView({ state, dispatch }) {
  const { imageUrls, pageIndex, readMode, readOrder } = state;

  const leftPageIndex = readMode === "LeftToRight" ? pageIndex : pageIndex + 1;
  const rightPageIndex = readMode === "LeftToRight" ? pageIndex + 1 : pageIndex;

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
    <div className="image-container">
      <div
        className="image-wrapper left-image"
        onClick={() => handleChangePage("left")}
      >
        <img src={imageUrls[leftPageIndex]} alt="" />
      </div>
      <div
        className="image-wrapper right-image"
        onClick={() => handleChangePage("right")}
      >
        <img src={imageUrls[rightPageIndex]} alt="" />
      </div>
    </div>
  );
}
