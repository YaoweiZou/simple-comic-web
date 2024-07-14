import { Link } from "@nextui-org/react";
import classNames from "classnames";
import React, { useRef, useState } from "react";

import { unzip } from "@/data/archive.js";
import { fileOpen } from "@/data/filesystem";
import { useSettings } from "@/store/settings";

export default function DragSection() {
  const {updateLoading, updateImagesInfo: setImagesInfo} = useSettings();

  const [borderHighlight, setBorderHighlight] = useState(false);
  const lastEnterTarget = useRef<EventTarget | null>(null);

  function dragEnterEventHandle(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log("enter: ", e.target);
    setBorderHighlight(true);
    lastEnterTarget.current = e.target;
  }

  function dragLeaveHandle(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log("leave: ", e.target);
    if (e.target === lastEnterTarget.current) {
      setBorderHighlight(false);
    }
  }

  function dropEventHandle(e: React.DragEvent<HTMLDivElement>) {
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
          setImagesInfo(urls.map(url => ({ url, width: 0, height: 0 })));
          updateLoading(false);
        });
      } catch (error) {
        console.error(error);
      } finally {
        urls.forEach(url => URL.revokeObjectURL(url));
      }
    }
  }

  async function openComicFile() {
    const comicFile = await fileOpen({ id: "open-comic-file" });
    updateLoading(true);
    const urls: string[] = [];
    try {
      unzip(comicFile).then(files => {
        files.forEach(item => urls.push(URL.createObjectURL(item.blob)));
        setImagesInfo(urls.map(url => ({ url, width: 0, height: 0 })));
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
        className={classNames(
          "flex min-h-52 items-center justify-center rounded-3xl border-4 border-dashed  p-4 duration-200 ease-in hover:border-blue-400",
          {
            "border-blue-400": borderHighlight,
            "border-gray-300": !borderHighlight
          }
        )}
        onDragEnter={dragEnterEventHandle}
        onDragOver={e => e.preventDefault()}
        onDragLeave={dragLeaveHandle}
        onDrop={dropEventHandle}
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
