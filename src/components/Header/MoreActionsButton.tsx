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
import { Key, useState } from "react";

import { IconRectangleGrid } from "@/components/icons/IconRectangleGrid";
import AboutDialog from "./AboutDialog";

export default function MoreActionsButton() {
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  function readModeChange(key: Key) {
    console.log(key.toString());
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
            <IconRectangleGrid fill="#1d1d1f" fillOpacity="0.85" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="flat">
          <DropdownSection title="更多设置" aria-label="设置" showDivider>
            <DropdownItem key="fullScreen" shortcut="⌘F">
              进入全屏
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="readOrder"
              description="仅在单页或双页布局有效"
              endContent={
                <Tabs aria-label="readOrder" onSelectionChange={readModeChange}>
                  <Tab key="ltr" title="普通" />
                  <Tab key="rtl" title="日漫" />
                </Tabs>
              }
            >
              翻页顺序
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
            <DropdownItem key="currentPageInfo" shortcut="⌘I">
              当前页面信息
            </DropdownItem>
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
