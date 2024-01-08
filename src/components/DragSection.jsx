import { useEffect, useRef } from "preact/hooks";

import { unzip } from "@/utils/unzip.js";

export default function DragSection({ state, dispatch }) {
  const dragSectionRef = useRef(null);

  useEffect(() => {
    const dropEvent = (e) => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      const files = Array.from(e.dataTransfer.files);
      dispatch({ type: "TOGGLE_LOADING" });
      const file = files[0];
      if (file) {
        const urls = [];
        try {
          unzip(file).then((files) => {
            files.forEach(item => urls.push(URL.createObjectURL(item.blob)));
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

  function handleUpdateFile(event) {
    const files = event.target.files ?? [];
    if (files.length === 0) {
      return;
    }
    dispatch({ type: "TOGGLE_LOADING" });
    const file = files[0];
    if (file) {
      const urls = [];
      try {
        unzip(file).then((files) => {
          files.forEach((item) => urls.push(URL.createObjectURL(item.blob)));
          dispatch({ type: "SET_IMAGE_URLS", payload: urls });
          dispatch({ type: "TOGGLE_LOADING" });
        });
      } catch (error) {
        console.error(error);
      } finally {
        urls.forEach((url) => URL.revokeObjectURL(url));
      }
    }
  }

  return (
    <div>
      <div
        ref={dragSectionRef}
        className="flex justify-center items-center min-h-52 p-4 border-4 border-dashed border-gray-200 hover:border-gray-300 rounded-3xl ease-in duration-200"
      >
        <div className="drag-content">
          <p className="text-lg">
            将漫画文件拖动到此处或
            <label
              className="underline cursor-pointer text-blue-500"
              htmlFor="upload-file"
              title="打开文件"
            >
              选择文件
            </label>
            开始阅读
          </p>
          <input
            id="upload-file"
            className="hidden"
            type="file"
            accept=".cbz,.zip"
            onChange={handleUpdateFile}
            title="上传漫画文件"
          />
        </div>
      </div>
    </div>
  );
}
