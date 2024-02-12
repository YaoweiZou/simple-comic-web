import DragSection from "@/components/DragSection";
import Header from "@/components/Header";
import ImagesView from "@/components/ImagesView";
import reducer, { State } from "@/reducer";
import { useReducer } from "react";

const initState: State = {
  imageUrls: [],
  pageIndex: 0,
  readMode: "Double",
  readOrder: "RTL",
  isLoading: false
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { imageUrls } = state;

  return imageUrls.length === 0 ? (
    <main className="flex h-[100vh] items-center justify-center">
      <div className="m-8 w-1/2 rounded-3xl border border-solid border-gray-200 bg-gray-50 p-8">
        <div>
          <h1 className="text-4xl font-semibold">Simple Comic Web</h1>
          <p className="my-6 text-base">在浏览器中阅读本地漫画，支持 zip 和 cbz 文件。</p>
        </div>
        <DragSection state={state} dispatch={dispatch} />
      </div>
    </main>
  ) : (
    <>
      <Header state={state} dispatch={dispatch} />
      <ImagesView state={state} dispatch={dispatch} />
    </>
  );
}
