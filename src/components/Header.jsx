import ActionButton from "@/components/ActionButton";
import UpdateButton from "@/components/UpdateButton";
import { IconRectangleGrid } from "@/components/icons/IconRectangleGrid";
import { IconWandAndStars } from "@/components/icons/IconWandAndStars";

export default function Header({ state, dispatch }) {
  const { isLoading } = state;

  function handleMatchPage() {
    dispatch({ type: "MATCH_PAGE" });
  }

  return (
    <header className="header">
      <div className="left">
        <div className="info">Simple Comic Web</div>
        <UpdateButton isLoading={isLoading} dispatch={dispatch} />
      </div>
      <div className="right">
        <ActionButton
          title="调整跨页匹配，仅在双页面布局生效。"
          onClick={handleMatchPage}
        >
          <IconWandAndStars fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
        <ActionButton title="缩略视图" onClick={() => {}}>
          <IconRectangleGrid fill="#1d1d1f" fillOpacity="0.85" />
        </ActionButton>
      </div>
    </header>
  );
}
