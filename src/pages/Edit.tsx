import { Component, Show, Suspense, createEffect, createResource, createSignal } from "solid-js"
import FileInput from "../components/inputs/FileInput"
import { CanvasAPI } from "../composables/Canvas";
import { SelectInput } from "../components/inputs/SelectInput";
import { getImageList } from "../composables/ImageList";
import { TextInput } from "../components/inputs/TextInput";
import { NumberInput } from "../components/inputs/NumberInput";

export const Edit: Component = () => {
  const [selectInputOptions] = createResource(getImageList);
  const [isCreated, setIsCreated] = createSignal(false);
  const [reduceYBy, setReduceYBy] = createSignal(0);
  const [fontSize, setFontSize] = createSignal(45);
  const [textContent, setTextContent] = createSignal("");

  let canvasRef: HTMLCanvasElement | undefined;
  let canvas: CanvasAPI | undefined;
  createEffect(() => {
    canvas = new CanvasAPI(canvasRef);
    canvas.drawImageWithURL("/placeholder.jpg", true);
  });

  // A handler for background Image changes.
  const onBackgroundImageChange = (fileBuffer: ArrayBuffer) => {
    canvas.clearCanvas();
    canvas.drawImageWithBuffer(fileBuffer, true);
    setIsCreated(true);
  }

  // A handler for foreground Image changes.
  const onForegroundImageChange = (value: string) => {
    canvas.drawImageWithURL(value, false);
  }

  // A handler for text content changes.
  const onTextChange = (text: string) => {
    setTextContent(text);
    canvas.writeText(text, fontSize(), reduceYBy());
  }

  // A handler for font size changes.
  const onFontSizeChange = (size: number) => {
    setFontSize(size);
    canvas.writeText(textContent(), size, reduceYBy());
  }

  // A handler for Y value decreaser changes. This is used to move the text up or down.
  const onYValueChange = (value: number) => {
    setReduceYBy(value);
    canvas.writeText(textContent(), fontSize(), value);
  }

  return (
    <div class="flex flex-col lg:flex-row gap-x-4 gap-y-6 lg:gap-y-0 justify-center">
      <div class="flex flex-col gap-y-4 lg:w-1/3">
        <canvas ref={canvasRef} height={1080} width={1080} />
      </div>

      <div class="flex flex-col gap-y-4 lg:ml-8">
        <Show when={!isCreated()}>
          <label>Upload a file</label>
        </Show>
        <FileInput onFileChange={onBackgroundImageChange} />

        <Show when={isCreated()}>
          <div class="flex flex-col gap-y-1">
            <label>Give it a title:</label>
            <TextInput type="input" value="image" onValueChange={(event) => canvas.changeTitle(event)} />
          </div>


          <div class="flex flex-col gap-y-1">
            <label>Select an overlay image:</label>
            <Suspense>
              <SelectInput options={selectInputOptions()} onValueChange={onForegroundImageChange} />
            </Suspense>
          </div>

          <div class="flex flex-col gap-y-1">
            <label>Text content:</label>
            <TextInput onValueChange={onTextChange} placeholder="Text content goes here. You can make the text by wrapping it with **, Like **Hey**" type="textarea" />
          </div>

          <div class="flex flex-row gap-x-4">
            <div class="flex flex-col gap-y-1 w-1/2">
              <label>Font size:</label>
              <NumberInput onValueChange={onFontSizeChange} value={fontSize()} />
            </div>
            <div class="flex flex-col gap-y-1 w-1/2">
              <label>Move up:</label>
              <NumberInput onValueChange={onYValueChange} value={reduceYBy()} />
            </div>
          </div>

          <button class="bg-blue-700 text-white h-10 mt-2 rounded-lg" onclick={() => canvas.download()}>Save Image</button>
        </Show>
      </div>
    </div>
  )
}
