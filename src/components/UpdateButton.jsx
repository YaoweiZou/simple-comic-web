import JSZip from "jszip";
import { IconDocBadgePlus } from "@/components/icons/IconDocBadgePlus.jsx";

export default function UpdateButton({ isLoading, dispatch }) {
  async function handleUpdateFile(event) {
    const files = event.target.files ?? [];
    if (files.length === 0) {
      return;
    }
    dispatch({ type: "TOGGLE_LOADING" });
    const jszip = new JSZip();
    try {
      const zip = await jszip.loadAsync(files[0]);
      const urls = await Promise.all(
        Object.keys(zip.files)
          .filter((name) => !zip.files[name].dir)
          .map(async (name) => {
            const item = zip.files[name];
            const blob = await item.async("blob");
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
          })
      );
      dispatch({ type: "SET_IMAGE_URLS", payload: urls });
      dispatch({ type: "TOGGLE_LOADING" });
    } catch (error) {
      console.error(error);
    } finally {
      URL.revokeObjectURL(event.target.value);
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
