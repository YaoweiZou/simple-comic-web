import { IconDocBadgePlus } from "@/components/icons/IconDocBadgePlus.jsx";
import { unzip } from "@/utils/unzip.js";

export default function UpdateButton({ isLoading, dispatch }) {
  async function handleUpdateFile(event) {
    const files = event.target.files ?? [];
    if (files.length === 0) {
      return;
    }
    dispatch({ type: "TOGGLE_LOADING" });
    const file = files[0];
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
  }

  return (
    <label
      className="flex justify-center items-center h-[45px] min-w-9 mx-[5px] cursor-pointer"
      htmlFor="upload-file"
      title="打开文件"
    >
      <IconDocBadgePlus fill="#1d1d1f" fillOpacity="0.85" />
      <input
        id="upload-file"
        className="hidden"
        type="file"
        accept=".cbz,.zip"
        disabled={isLoading}
        onInput={handleUpdateFile}
        title="上传漫画文件"
      />
    </label>
  );
}
