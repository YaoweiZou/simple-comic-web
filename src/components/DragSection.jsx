import { useEffect, useRef } from "preact/hooks";
import { unzipSync } from "fflate";

export default function DragSection({ state, dispatch }) {
  const dragSectionRef = useRef(null);

  useEffect(() => {
    const dropEvent = (e) => {
      e.preventDefault();
      console.log("drop");
      if (!e.dataTransfer) return;
      const files = Array.from(e.dataTransfer.files);
      dispatch({ type: "TOGGLE_LOADING" });
      const file = files[0];
      if (file) {
        const urls = [];
        try {
          file.arrayBuffer().then((buff) => {
            const fileData = new Uint8Array(buff);
            const unzipped = unzipSync(fileData, {
              filter(file) {
                return !file.name.endsWith("/");
              },
            });
            Object.entries(unzipped).map(([name, data]) => {
              // 乱码
              // const fileName = new TextDecoder("utf-8").decode(strToU8(name));
              console.log(name);
              // console.log(fileName);
              const url = URL.createObjectURL(new Blob([data.buffer]));
              urls.push(url);
            });
            console.log(urls.length);
            dispatch({ type: "SET_IMAGE_URLS", payload: urls });
            dispatch({ type: "TOGGLE_LOADING" });
          });
        } catch (error) {
          console.error(error);
        } finally {
          urls.forEach((url) => URL.revokeObjectURL(url));
        }
      }
    };

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("drop", dropEvent);
    }
    return () => dragSectionRef.current.removeEventListener("drop", dropEvent);
  }, []);

  useEffect(() => {
    const dragEnterEvent = (e) => e.preventDefault();

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("dragenter", dragEnterEvent);
    }
    return () =>
      dragSectionRef.current.removeEventListener("dragenter", dragEnterEvent);
  }, []);

  useEffect(() => {
    const dragOverEvent = (e) => e.preventDefault();

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("dragover", dragOverEvent);
    }
    return () =>
      dragSectionRef.current.removeEventListener("dragover", dragOverEvent);
  }, []);

  return (
    <div>
      <div
        ref={dragSectionRef}
        className="flex justify-center items-center min-h-52 p-4 border-4 border-dashed rounded-3xl"
      >
        <div className="drag-content">
          <p className="text-lg">将漫画文件拖动到此处开始阅读</p>
        </div>
      </div>
    </div>
  );
}
