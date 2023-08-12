import { Component } from "solid-js"

interface FileInputProps {
  onFileChange: (fileBuffer: ArrayBuffer) => void;
}

/**
 * File input component. This component is used to select an image file from the user's device.
 */
const FileInput: Component<FileInputProps> = props => {
  const handleChange = async (event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
    const fileBuffer = await event.target.files[0].arrayBuffer();
    props.onFileChange(fileBuffer);
  }

  let inputRef: HTMLInputElement | undefined;

  return (
    <input
      type="file"
      accept="image/*"
      onchange={(e) => handleChange(e)}
      class="custom-file-input outline-none w-full bg-tertiary px-2 py-1 rounded-lg"
      ref={inputRef}
    />
  )
}

export default FileInput
