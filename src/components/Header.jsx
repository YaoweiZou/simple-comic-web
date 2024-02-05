import ActionButton from "@/components/ActionButton";
import { IconRectangleGrid } from "@/components/icons/IconRectangleGrid";
import { IconWandAndStars } from "@/components/icons/IconWandAndStars";
import { unzip } from "@/utils/unzip.js";
import { fileOpen } from "browser-fs-access";
import { IconDocBadgePlus } from "./icons/IconDocBadgePlus";
import { IconXmark } from "./icons/IconXmark";

export default function Header({ state, dispatch }) {
  const { isLoading } = state;

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

  function handelClose() {
    dispatch({ type: "SET_IMAGE_URLS", payload: [] });
  }

  function handleMatchPage() {
    dispatch({ type: "MATCH_PAGE" });
  }

  return (
    <header className="flex h-[55px] flex-row items-center justify-between border-b border-solid border-gray-300 bg-gray-50 px-[20px]">
      <div className="flex h-[45px] flex-row items-center justify-start gap-2">
        <div className="font-sans text-base font-semibold">Simple Comic Web</div>
        <ActionButton title="打开文件" onClick={openComicFile}>
          <IconDocBadgePlus fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
        <ActionButton title="关闭" onClick={handelClose}>
          <IconXmark fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
      </div>
      <div className="flex h-[45px] flex-row items-center justify-end gap-2">
        <ActionButton title="调整跨页匹配，仅在双页面布局有效。" onClick={handleMatchPage}>
          <IconWandAndStars fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
        <ActionButton title="缩略视图" onClick={() => {}}>
          <IconRectangleGrid fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
      </div>
    </header>
  );
}
