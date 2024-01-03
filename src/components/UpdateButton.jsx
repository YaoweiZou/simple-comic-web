import { IconDocBadgePlus } from "@/components/icons/IconDocBadgePlus.jsx";
import { strToU8, unzipSync } from "fflate";

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
        file.arrayBuffer().then((buff) => {
          const fileData = new Uint8Array(buff);
          const unzipped = unzipSync(fileData, {
            filter(file) {
              return !file.name.endsWith("/");
            },
          });
          Object.entries(unzipped).map(([name, data]) => {
            // 乱码
            // const fileName = new TextDecoder("utf-8").decode(strToU8(name));
            console.log(name);
            // console.log(fileName);
            const url = URL.createObjectURL(new Blob([data.buffer]));
            urls.push(url);
          });
          console.log(urls.length);
          dispatch({ type: "SET_IMAGE_URLS", payload: urls });
          dispatch({ type: "TOGGLE_LOADING" });
        });
      } catch (error) {
        console.error(error);
      } finally {
        urls.forEach((url) => URL.revokeObjectURL(url));
      }
    }
  }

  return (
    <label className="action-button" htmlFor="upload-file" title="打开文件">
      <IconDocBadgePlus fill="#1d1d1f" fillOpacity="0.85" />
      <input
        id="upload-file"
        className="upload-file"
        type="file"
        disabled={isLoading}
        onChange={handleUpdateFile}
        title="上传漫画文件"
      />
    </label>
  );
}
