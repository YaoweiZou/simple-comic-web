import { Link } from "@nextui-org/react";
import { useContext, useEffect, useRef } from "react";

import { unzip } from "@/data/archive.js";
import { fileOpen } from "@/data/filesystem";
import { AppSettingsContext } from "./AppSettingsProvider";

export default function DragSection() {
  const { updateLoading, updateImagesInfo } = useContext(AppSettingsContext);

  const dragSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropEvent = (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;
      const files = Array.from(e.dataTransfer.files);
      updateLoading(true);
      const file = files[0];
      if (file) {
        const urls: string[] = [];
        try {
          unzip(file).then(files => {
            files.forEach(item => urls.push(URL.createObjectURL(item.blob)));
            updateImagesInfo(urls.map(url => ({ url, width: 0, height: 0 })));
            updateLoading(false);
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
  }, [updateLoading, updateImagesInfo]);

  useEffect(() => {
    // drag and drop events
    const dragSectionRefCopy = dragSectionRef.current;

    const dragEnterEvent = (e: DragEvent) => e.preventDefault();
    dragSectionRefCopy?.addEventListener("dragenter", dragEnterEvent);

    const dragOverEvent = (e: DragEvent) => e.preventDefault();
    dragSectionRefCopy?.addEventListener("dragover", dragOverEvent);

    const dragLeave = (e: DragEvent) => e.preventDefault();
    dragSectionRefCopy?.addEventListener("dragleave", dragLeave);

    return () => {
      dragSectionRefCopy?.removeEventListener("dragenter", dragEnterEvent);
      dragSectionRefCopy?.removeEventListener("dragover", dragOverEvent);
      dragSectionRefCopy?.removeEventListener("dragleave", dragLeave);
    };
  }, []);

  async function openComicFile() {
    const comicFile = await fileOpen({ id: "open-comic-file" });
    updateLoading(true);
    const urls: string[] = [];
    try {
      unzip(comicFile).then(files => {
        files.forEach(item => urls.push(URL.createObjectURL(item.blob)));
        updateImagesInfo(urls.map(url => ({ url, width: 0, height: 0 })));
        updateLoading(false);
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
