/**
 * The select component's options are coming from a json file at `/public/foreground/list.json`.
 * As It's not generated automatically, you'll need to edit it manually to add new images.
 */
export async function getImageList(): Promise<{ label: string; value: string; }[]> {
  const response = await fetch("/foreground/list.json");
  const data = await response.json();
  return data;
}
