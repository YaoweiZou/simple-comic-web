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
import React, { useContext, useState } from "react";

import AboutDialog from "@/components/AboutDialog";
import { AppSettingsContext } from "@/components/AppSettingsProvider";
import { defaultAppSettings } from "@/data/settings";

export default function MoreActionsButton() {
  const [fullscreen, setFullscreen] = useState(false);
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const { appSettings, updateAppSettings } = useContext(AppSettingsContext);

  const { pageView, pagesGap, noiseReduction, showPicInfo } = appSettings;

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

  function handleReadModeChange(key: React.Key) {
    updateAppSettings({ ...appSettings, readMode: key as "ltr" | "rtl" });
  }

  function handlePagesGap(checked: boolean) {
    updateAppSettings({ ...appSettings, pagesGap: checked });
  }

  function handleShowPicInfo(checked: boolean) {
    updateAppSettings({ ...appSettings, showPicInfo: checked });
  }

  function handleNoiseReduction(checked: boolean): void {
    updateAppSettings({ ...appSettings, noiseReduction: checked });
  }

  return (
    <>
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button title="更多" aria-label="更多" isIconOnly variant="light" radius="sm">
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
              key="readMode"
              endContent={
                <Tabs
                  aria-label="阅读模式"
                  defaultSelectedKey={defaultAppSettings.readMode}
                  onSelectionChange={handleReadModeChange}
                  isDisabled={pageView === "webtoon"}
                >
                  <Tab key="ltr" title="普通" />
                  <Tab key="rtl" title="日漫" />
                </Tabs>
              }
            >
              阅读模式
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="pagesGap"
              endContent={
                <Switch
                  aria-label="页面间隔"
                  defaultSelected={pagesGap}
                  onValueChange={handlePagesGap}
                  isDisabled={pageView === "single"}
                />
              }
            >
              页面间隔
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="showPicInfo"
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
              key="noiseReduction"
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
