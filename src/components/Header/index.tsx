import { Button, Tab, Tabs } from "@nextui-org/react";

import { IconDocBadgePlus } from "@/components/icons/IconDocBadgePlus";
import { IconRectangleGrid } from "@/components/icons/IconRectangleGrid";
import { IconWandAndStars } from "@/components/icons/IconWandAndStars";
import { IconXmark } from "@/components/icons/IconXmark";
import { unzip } from "@/data/archive";
import { fileOpen } from "@/data/filesystem";
import MoreActionsButton from "./MoreActionsButton";

export default function Header({ state, dispatch }) {
  const { isLoading } = state;

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

  function handelClose() {
    dispatch({ type: "SET_IMAGE_URLS", payload: [] });
  }

  function handleMatchPage() {
    dispatch({ type: "MATCH_PAGE" });
  }

  return (
    <header className="flex h-[55px] flex-row items-center justify-between border-b border-solid border-gray-300 bg-gray-50 px-[20px]">
      <div className="flex flex-row items-center justify-start gap-3">
        <div className="whitespace-nowrap font-sans text-base font-semibold">Simple Comic Web</div>
        <Button
          title="打开文件"
          aria-label="打开文件"
          isIconOnly
          variant="light"
          radius="sm"
          disabled={isLoading}
          onClick={() => openComicFile()}
        >
          <IconDocBadgePlus fill="#1d1d1f" fillOpacity="0.85" />
        </Button>
        <Button
          title="关闭"
          aria-label="关闭"
          isIconOnly
          variant="light"
          radius="sm"
          disabled={isLoading}
          onClick={handelClose}
        >
          <IconXmark fill="#1d1d1f" fillOpacity="0.85" />
        </Button>
      </div>
      <div className="flex flex-row items-center justify-end gap-3">
        <Tabs aria-label="readMode" onSelectionChange={() => {}}>
          <Tab key="single" title="单页" />
          <Tab key="double" title="双页" />
          <Tab key="webtoon" title="Webtoon" />
        </Tabs>
        <Button
          title="调整跨页匹配，仅在双页面布局有效。"
          aria-label="调整跨页匹配，仅在双页面布局有效。"
          isIconOnly
          variant="light"
          radius="sm"
          onClick={handleMatchPage}
        >
          <IconWandAndStars fill="#1d1d1f" fillOpacity="0.85" />
        </Button>
        <Button
          title="缩略视图"
          aria-label="缩略视图"
          isIconOnly
          variant="light"
          radius="sm"
          onClick={() => {}}
        >
          <IconRectangleGrid fill="#1d1d1f" fillOpacity="0.85" />
        </Button>
        <MoreActionsButton />
      </div>
    </header>
  );
}