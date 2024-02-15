import { Link } from "@nextui-org/react";
import DragSection from "./DragSection";

export default function Welcome() {
  return (
    <main className="flex h-[100vh] items-center justify-center">
      <div className="m-8 w-1/2 rounded-3xl border border-solid border-gray-200 bg-gray-50 p-8">
        <div>
          <h1 className="text-4xl font-semibold">Simple Comic Web</h1>
          <p className="my-3 text-base">在浏览器中阅读本地漫画，支持 zip 和 cbz 文件。</p>
          <Link href="https://github.com/YaoweiZou/simple-comic-web" target="_blank">
            GitHub
          </Link>
        </div>
        <DragSection />
      </div>
    </main>
  );
}
