import { useEffect, useRef } from "preact/hooks";
import { unzipSync } from "fflate";

export default function DragSection({state, dispatch}) {
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
    <section className="drag-section">
      <div ref={dragSectionRef} className="drag-wrapper">
        <div className="drag-content">
          <h1>Simple Comic Web</h1>
          <p>将漫画文件拖动到此处</p>
        </div>
      </div>
    </section>
  );
}
