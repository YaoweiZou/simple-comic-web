import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Switch,
  Tab,
  Tabs
} from "@nextui-org/react";
import { Settings } from "lucide-react";
import { Key, useState } from "react";

import AboutDialog from "./AboutDialog";

export default function MoreActionsButton() {
  const [fullscreen, setFullscreen] = useState(false);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const [readMode, setReadMode] = useState<"ltf" | "rtl" | "webtoon">("rtl");

  function isFullscreen(): boolean {
    return document.fullscreenElement !== null;
  }

  function toggleFullScreen() {
    if (isFullscreen()) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    }
  }

  function handleReadModeChange(key: Key) {
    setReadMode(key as "ltf" | "rtl" | "webtoon");
  }

  return (
    <>
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button
            title="更多"
            aria-label="更多"
            isIconOnly
            variant="light"
            radius="sm"
            onClick={() => {}}
          >
            <Settings strokeWidth={1.5} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="flat">
          <DropdownSection title="更多设置" aria-label="设置" showDivider>
            <DropdownItem key="fullScreen" shortcut="⌘F" onClick={toggleFullScreen}>
              {fullscreen ? "退出全屏" : "进入全屏"}
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="readOrder"
              description="Webtoon 模式仅在滚动视图中有效"
              endContent={
                <Tabs
                  aria-label="阅读模式"
                  defaultSelectedKey="rtl"
                  onSelectionChange={handleReadModeChange}
                >
                  <Tab key="ltr" title="普通" />
                  <Tab key="rtl" title="日漫" />
                  <Tab key="webtoon" title="Webtoon" />
                </Tabs>
              }
            >
              阅读模式
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="showPicInfo"
              endContent={<Switch aria-label="显示图片信息" />}
            >
              显示图片信息
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key=""
              description="图片降噪"
              endContent={<Switch aria-label="图片降噪" />}
            >
              图片降噪
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="其他" aria-label="其他">
            <DropdownItem key="about" onClick={() => setAboutDialogOpen(true)}>
              关于
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <AboutDialog isOpen={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
    </>
  );
}
