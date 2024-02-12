import { fileOpen as _fileOpen } from "browser-fs-access";

export const fileOpen = <M extends boolean | undefined = false>(opts: {
  extensions?: string[];
  multiple?: M;
  description?: string;
  id: string;
}) => {
  // an unsafe TS hack, alas not much we can do AFAIK
  type RetType = M extends false | undefined ? File : File[];

  return _fileOpen({
    // List of allowed MIME types, defaults to `*/*`.
    mimeTypes: ["application/zip"],
    // List of allowed file extensions (with leading '.'), defaults to `''`.
    extensions: opts.extensions || [".cbz", ".zip"],
    // Set to `true` for allowing multiple files, defaults to `false`.
    multiple: opts.multiple,
    // Textual description for file dialog , defaults to `''`.
    description: opts.description || "cbz 或 zip 漫画文件",
    // Suggested directory in which the file picker opens. A well-known directory, or a file or directory handle.
    startIn: "desktop",
    // By specifying an ID, the user agent can remember different directories for different IDs.
    id: opts.id,
    // Include an option to not apply any filter in the file picker, defaults to `false`.
    excludeAcceptAllOption: true
  }) as Promise<RetType>;
};
