import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";

export default function AboutDialog({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
      isDismissable={false}
      radius="sm"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">关于</ModalHeader>
            <ModalBody>
              <h2 className="font-bold">Simple Comic Web</h2>
              <p>在浏览器中阅读本地漫画，支持 zip 和 cbz 文件。</p>
              <p>
                <Link href="https://github.com/YaoweiZou/simple-comic-web" target="_blank">
                  GitHub
                </Link>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" radius="sm" onPress={onClose}>
                关闭
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
