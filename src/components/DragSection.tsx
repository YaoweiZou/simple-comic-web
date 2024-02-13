import { Link } from "@nextui-org/react";
import { useEffect, useRef } from "react";

import { unzip } from "@/data/archive.js";
import { fileOpen } from "@/data/filesystem";

export default function DragSection({ dispatch }) {
  const dragSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropEvent = (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      const files = Array.from(e.dataTransfer.files);
      dispatch({ type: "TOGGLE_LOADING" });
      const file = files[0];
      if (file) {
        const urls: string[] = [];
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

    const dragSectionRefCopy = dragSectionRef.current;
    dragSectionRefCopy?.addEventListener("drop", dropEvent);
    return () => dragSectionRefCopy?.removeEventListener("drop", dropEvent);
  }, [dispatch]);

  useEffect(() => {
    const dragEnterEvent = (e: DragEvent) => {
      e.preventDefault();
    };

    const dragSectionRefCopy = dragSectionRef.current;
    dragSectionRefCopy?.addEventListener("dragenter", dragEnterEvent);
    return () => dragSectionRefCopy?.removeEventListener("dragenter", dragEnterEvent);
  }, []);

  useEffect(() => {
    const dragOverEvent = (e: DragEvent) => e.preventDefault();

    const dragSectionRefCopy = dragSectionRef.current;
    dragSectionRefCopy?.addEventListener("dragover", dragOverEvent);
    return () => dragSectionRefCopy?.removeEventListener("dragover", dragOverEvent);
  }, []);

  useEffect(() => {
    const dragLeave = (e: DragEvent) => {
      e.preventDefault();
    };

    const dragSectionRefCopy = dragSectionRef.current;
    dragSectionRefCopy?.addEventListener("dragleave", dragLeave);
    return () => dragSectionRefCopy?.removeEventListener("dragleave", dragLeave);
  });

  async function openComicFile() {
    const comicFile = await fileOpen({ id: "open-comic-file" });
    dispatch({ type: "TOGGLE_LOADING" });
    const urls: string[] = [];
    try {
      unzip(comicFile).then(files => {
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

  return (
    <div className="mt-6">
      <div
        ref={dragSectionRef}
        className="flex min-h-52 items-center justify-center rounded-3xl border-4 border-dashed border-gray-300 p-4 duration-200 ease-in"
      >
        <div className="drag-content">
          <p className="text-lg">
            将漫画文件拖动到此处或
            <Link
              className="cursor-pointer"
              title="打开文件"
              onPress={openComicFile}
              underline="always"
              size="lg"
            >
              选择文件
            </Link>
            开始阅读
          </p>
        </div>
      </div>
    </div>
  );
}
