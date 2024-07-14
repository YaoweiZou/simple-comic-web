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
import {
  ArrowLeftRight,
  BadgeInfo,
  BetweenVerticalStart,
  Expand,
  Image,
  Info,
  Settings2
} from "lucide-react";
import React, { useEffect, useState } from "react";

import AboutDialog from "@/components/AboutDialog";
import { useSettings } from "@/store/settings";

export default function MoreActionsButton() {
  const [fullscreen, setFullscreen] = useState(false);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const {
    readMode,
    readOrder,
    pagesGap,
    showPicInfo,
    noiseReduction,
    updateReadOrder,
    updatePagesGap,
    updateShowPicInfo,
    updateNoiseReduction
  } = useSettings();

  function isFullscreen(): boolean {
    return document.fullscreenElement !== null;
  }

  function toggleFullScreen() {
    if (isFullscreen()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    function syncFullscreenState() {
      setFullscreen(isFullscreen());
    }
    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  function handleReadModeChange(key: React.Key) {
    updateReadOrder(key as "RTL" | "LTR");
  }

  function handlePagesGap(checked: boolean) {
    updatePagesGap(checked);
  }

  function handleShowPicInfo(checked: boolean) {
    updateShowPicInfo(checked);
  }

  function handleNoiseReduction(checked: boolean): void {
    updateNoiseReduction(checked);
  }

  return (
    <>
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button title="更多" aria-label="更多" isIconOnly variant="light" radius="sm">
            <Settings2 strokeWidth={1.5} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="flat">
          <DropdownSection title="更多设置" aria-label="更多设置" showDivider>
            <DropdownItem
              key="fullScreen"
              shortcut="⌘F"
              onClick={toggleFullScreen}
              startContent={<Expand size={16} strokeWidth={2} />}
            >
              {fullscreen ? "退出全屏" : "进入全屏"}
            </DropdownItem>
            <DropdownItem
              isReadOnly
              className="cursor-default"
              key="readMode"
              startContent={<ArrowLeftRight size={16} strokeWidth={2} />}
              endContent={
                <Tabs
                  aria-label="阅读顺序"
                  defaultSelectedKey={readOrder}
                  onSelectionChange={handleReadModeChange}
                  isDisabled={readMode === "webtoon"}
                >
                  <Tab key="LTR" title="LTR" />
                  <Tab key="RTL" title="RTL" />
                </Tabs>
              }
            >
              阅读顺序
            </DropdownItem>
            <DropdownItem
              isReadOnly
              className="cursor-default"
              key="pagesGap"
              startContent={<BetweenVerticalStart size={16} strokeWidth={2} />}
              endContent={
                <Switch
                  aria-label="页面间隔"
                  defaultSelected={pagesGap}
                  onValueChange={handlePagesGap}
                  isDisabled={readMode === "single"}
                />
              }
            >
              页面间隔
            </DropdownItem>
            <DropdownItem
              isReadOnly
              className="cursor-default"
              key="showPicInfo"
              startContent={<BadgeInfo size={16} strokeWidth={2} />}
              endContent={
                <Switch
                  aria-label="显示图片信息"
                  defaultSelected={showPicInfo}
                  onValueChange={handleShowPicInfo}
                />
              }
            >
              显示图片信息
            </DropdownItem>
            <DropdownItem
              isReadOnly
              className="cursor-default"
              key="noiseReduction"
              startContent={<Image size={16} strokeWidth={2} />}
              endContent={
                <Switch
                  aria-label="图片降噪"
                  defaultSelected={noiseReduction}
                  onValueChange={handleNoiseReduction}
                />
              }
            >
              图片降噪
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="其他" aria-label="其他">
            <DropdownItem
              key="about"
              onClick={() => setAboutDialogOpen(true)}
              startContent={<Info size={16} strokeWidth={2} />}
            >
              关于
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <AboutDialog isOpen={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
    </>
  );
}
