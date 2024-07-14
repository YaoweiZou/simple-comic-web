import { Button, Tab, Tabs } from "@nextui-org/react";
import { BookOpenCheck, FileArchive, LayoutGrid, XCircle } from "lucide-react";
import React from "react";

import { unzip } from "@/data/archive";
import { fileOpen } from "@/data/filesystem";
import { useSettings } from "@/store/settings";
import MoreActionsButton from "./MoreActionsButton";
import Zoom from "./Zoom";

export default function Header() {
  const {
    imagesInfo,
    currentPage,
    loading,
    readMode,
    updateImagesInfo,
    updateCurrentPage,
    updateLoading,
    updateReadMode
  } = useSettings();

  function handlePageViewChange(key: React.Key) {
    updateReadMode(key as "single" | "double" | "webtoon");
  }

  async function openComicFile() {
    updateLoading(true);
    const comicFile = await fileOpen({ id: "open-comic-file" });
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

  function handleCloseComic() {
    imagesInfo.forEach(item => URL.revokeObjectURL(item.url));
    updateImagesInfo([]);
    updateCurrentPage(0);
  }

  function handleMatchPage() {
    updateCurrentPage(currentPage + 1);
  }

  return (
    <header className="flex h-[55px] flex-row items-center justify-between border-b border-solid border-gray-300 bg-gray-50 px-[20px]">
      <div className="flex flex-row items-center justify-start gap-3">
        <h2 className="whitespace-nowrap font-sans text-base font-semibold">Simple Comic Web</h2>
        <Button
          title="打开漫画文件"
          aria-label="打开漫画文件"
          isIconOnly
          variant="light"
          radius="sm"
          disabled={loading}
          onClick={() => openComicFile()}
        >
          <FileArchive strokeWidth={1.5} />
        </Button>
        <Button
          title="关闭"
          aria-label="关闭"
          isIconOnly
          variant="light"
          radius="sm"
          disabled={loading}
          onClick={handleCloseComic}
        >
          <XCircle strokeWidth={1.5} />
        </Button>
        <Zoom />
      </div>
      <div className="flex flex-row items-center justify-end gap-3">
        <Button
          title="调整跨页匹配，仅在双页面布局有效。"
          aria-label="调整跨页匹配，仅在双页面布局有效。"
          isIconOnly
          variant="light"
          radius="sm"
          isDisabled={readMode !== "double"}
          onClick={handleMatchPage}
        >
          <BookOpenCheck strokeWidth={1.5} />
        </Button>
        <Button
          title="缩略视图"
          aria-label="缩略视图"
          isIconOnly
          variant="light"
          radius="sm"
          onClick={() => {}}
        >
          <LayoutGrid strokeWidth={1.5} />
        </Button>
        <Tabs
          aria-label="页面视图"
          defaultSelectedKey={readMode}
          onSelectionChange={handlePageViewChange}
        >
          <Tab key="single" title="单页" />
          <Tab key="double" title="双页" />
          <Tab key="webtoon" title="Webtoon" />
        </Tabs>
        <MoreActionsButton />
      </div>
    </header>
  );
}
