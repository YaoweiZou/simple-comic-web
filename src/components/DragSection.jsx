import { fileOpen } from "browser-fs-access";
import { useEffect, useRef, useState } from "preact/hooks";

import { unzip } from "@/utils/unzip.js";

export default function DragSection({ state, dispatch }) {
  const dragSectionRef = useRef(null);

  useEffect(() => {
    const dropEvent = e => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      const files = Array.from(e.dataTransfer.files);
      dispatch({ type: "TOGGLE_LOADING" });
      const file = files[0];
      if (file) {
        const urls = [];
        try {
          unzip(file).then(files => {
            files.forEach(item => urls.push(URL.createObjectURL(item.blob)));
            dispatch({ type: "SET_IMAGE_URLS", payload: urls });
            dispatch({ type: "TOGGLE_LOADING" });
          });
        } catch (error) {
          console.error(error);
        } finally {
          urls.forEach(url => URL.revokeObjectURL(url));
        }
      }
    };

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("drop", dropEvent);
    }
    return () => dragSectionRef.current.removeEventListener("drop", dropEvent);
  }, []);

  useEffect(() => {
    const dragEnterEvent = e => {
      e.preventDefault();
    };

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("dragenter", dragEnterEvent);
    }
    return () => dragSectionRef.current.removeEventListener("dragenter", dragEnterEvent);
  }, []);

  useEffect(() => {
    const dragOverEvent = e => e.preventDefault();

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("dragover", dragOverEvent);
    }
    return () => dragSectionRef.current.removeEventListener("dragover", dragOverEvent);
  }, []);

  useEffect(() => {
    const dragLeave = e => {
      e.preventDefault();
    };

    if (dragSectionRef.current) {
      dragSectionRef.current.addEventListener("dragleave", dragLeave);
    }

    return () => dragSectionRef.current.removeEventListener("dragleave", dragLeave);
  });

  const [result, setResult] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function openFileLocal(multiple = false) {
    window
      .showOpenFilePicker({
        multiple: multiple,
        excludeAcceptAllOption: true,
        types: [
          {
            description: "cbz 或 zip 漫画文件",
            accept: {
              "application/zip": [".zip", ".cbz"]
            }
          }
        ]
      })
      .then(fileHandles => {
        console.log(fileHandles);
        let files = fileHandles.map(fileHandle => fileHandle.name || "").join("\n");
        setResult(`选择了 ${fileHandles.length} 个文件: \n${files}`);
        setErrMsg("");
      })
      .catch(err => {
        console.log(err);
        setResult("");
        setErrMsg("选择文件失败: " + err.message);
      });
  }

  function openComicFile(multiple = false) {
    fileOpen({
      multiple: multiple,
      excludeAcceptAllOption: true,
      types: [
        {
          description: "cbz 或 zip 漫画文件",
          accept: {
            "application/zip": [".zip", ".cbz"]
          }
        }
      ]
    })
      .then(fileHandles => {
        dispatch({ type: "TOGGLE_LOADING" });
        const file = fileHandles[0];
        if (file) {
          const urls = [];
          try {
            unzip(file).then(files => {
              files.forEach(item => urls.push(URL.createObjectURL(item.blob)));
              dispatch({ type: "SET_IMAGE_URLS", payload: urls });
              dispatch({ type: "TOGGLE_LOADING" });
            });
          } catch (error) {
            console.error(error);
          } finally {
            urls.forEach(url => URL.revokeObjectURL(url));
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <div
        ref={dragSectionRef}
        className="flex min-h-52 items-center justify-center rounded-3xl border-4 border-dashed border-gray-300 p-4 duration-200 ease-in"
      >
        <div className="drag-content">
          <p className="text-lg">
            将漫画文件拖动到此处或
            <button
              className="cursor-pointer text-blue-500 underline"
              title="打开文件"
              onClick={openComicFile}
            >
              选择文件
            </button>
            开始阅读
          </p>
        </div>
      </div>
    </div>
  );
}
