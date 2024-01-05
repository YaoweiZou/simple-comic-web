import { useReducer } from "preact/hooks";

import "@/App.css";
import Header from "@/components/Header";
import reducer from "@/reducer";
import DragSection from "./components/DragSection";
import ImagesView from "./components/ImagesView";

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

  function handleWhell(e) {
    console.log(e);
  }

  return (
    <>
      {imageUrls.length === 0 ? (
        <DragSection state={state} dispatch={dispatch} />
      ) : (
        <>
          <Header state={state} dispatch={dispatch} />
          <main className="main" onWheel={handleWhell}>
            <ImagesView state={state} dispatch={dispatch} />
          </main>
        </>
      )}
    </>
  );
}
