import { unzipSync } from "fflate";

/**
 *
 * @param {File} file
 */
export function unzip(file) {
  return file.arrayBuffer().then(buff => {
    const fileData = new Uint8Array(buff);
    const unzipped = unzipSync(fileData, {
      filter(file) {
        return !file.name.endsWith("/");
      }
    });
    return Object.entries(unzipped).map(([name, data]) => {
      // 乱码
      // const fileName = new TextDecoder("utf-8").decode(strToU8(name));
      console.log(name);
      // console.log(fileName);
      return {
        name,
        blob: new Blob([data.buffer])
      };
    });
  });
}
