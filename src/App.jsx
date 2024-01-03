import "@/App.css";
import Header from "@/components/Header";
import reducer from "@/reducer";
import { useReducer } from "preact/hooks";

const initState = {
  imageUrls: [],
  pageIndex: 0,
  readMode: "Double",
  readOrder: "RightToLeft",
  isLoading: false,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { imageUrls, pageIndex, readMode, readOrder, isLoading } = state;

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
    <div className="app">
      <Header state={state} dispatch={dispatch} />
      <main className="main" onWheel={handleWhell}>
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
      </main>
    </div>
  );
}
