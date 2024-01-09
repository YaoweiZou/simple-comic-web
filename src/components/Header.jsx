import ActionButton from "@/components/ActionButton";
import UpdateButton from "@/components/UpdateButton";
import { IconRectangleGrid } from "@/components/icons/IconRectangleGrid";
import { IconWandAndStars } from "@/components/icons/IconWandAndStars";
import { IconXmark } from "./icons/IconXmark";

export default function Header({ state, dispatch }) {
  const { isLoading } = state;

  function handelClose() {
    dispatch({ type: "SET_IMAGE_URLS", payload: [] });
  }

  function handleMatchPage() {
    dispatch({ type: "MATCH_PAGE" });
  }

  return (
    <header className="flex flex-row justify-between items-center h-[55px] px-[20px] bg-gray-50">
      <div className="flex flex-row justify-start items-center gap-3 h-[45px]">
        <div className="text-base font-sans font-semibold">Simple Comic Web</div>
        <UpdateButton isLoading={isLoading} dispatch={dispatch} />
        <ActionButton title="关闭" onClick={handelClose}>
          <IconXmark fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
      </div>
      <div className="flex flex-row justify-end items-center gap-3 h-[45px]">
        <ActionButton title="调整跨页匹配，仅在双页面布局生效。" onClick={handleMatchPage}>
          <IconWandAndStars fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
        <ActionButton title="缩略视图" onClick={() => {}}>
          <IconRectangleGrid fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
      </div>
    </header>
  );
}
