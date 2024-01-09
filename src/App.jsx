import { useReducer } from "preact/hooks";

import DragSection from "@/components/DragSection";
import Header from "@/components/Header";
import ImagesView from "@/components/ImagesView";
import reducer from "@/reducer";

const initState = {
  imageUrls: [],
  pageIndex: 0,
  readMode: "Double",
  readOrder: "RightToLeft",
  isLoading: false
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { imageUrls, pageIndex, readMode, readOrder, isLoading } = state;

  return (
    <>
      {imageUrls.length === 0 ? (
        <main className="flex items-center justify-center h-full">
          <div className="w-1/2 p-8 m-8 bg-gray-50 border border-solid border-gray-200 rounded-3xl">
            <div>
              <h1 className="text-4xl font-semibold">Simple Web Comic</h1>
              <p className="text-base my-6">在浏览器中阅读本地漫画，支持 zip 和 cbz 文件。</p>
            </div>
            <DragSection state={state} dispatch={dispatch} />
          </div>
        </main>
      ) : (
        <>
          <Header state={state} dispatch={dispatch} />
          <ImagesView state={state} dispatch={dispatch} />
        </>
      )}
    </>
  );
}
