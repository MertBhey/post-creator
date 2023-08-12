/**
 * Our CanvasAPI class is a wrapper around the HTML5 Canvas API.
 * It provides a simple interface for drawing images and adding text to a canvas with some additional
 * features such as downloading the canvas as a PNG, line-breaking while writing text etc.
 */
export class CanvasAPI {
  private ctx: CanvasRenderingContext2D;
  private backgroundImage: HTMLImageElement | undefined;
  private foregroundImage: HTMLImageElement | undefined;
  private title: string = "image";

  constructor(element: HTMLCanvasElement) {
    this.ctx = element.getContext("2d");
    this.ctx.fillStyle = "#FFFFFF";
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawImageWithBuffer(buffer: ArrayBuffer, isBackground: boolean = false) {
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([buffer]));

    img.onload = () => {
      this.drawImage(img, isBackground);
    }
  }

  drawImageWithURL(url: string, isBackground: boolean = false) {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      this.drawImage(img, isBackground);
    }
  }

  drawImage(image: HTMLImageElement, isBackground: boolean = false) {
    if(isBackground) {
      this.backgroundImage = image;
    } else {
      this.clearCanvas();
      if(this.backgroundImage) this.drawImage(this.backgroundImage, true);
      this.foregroundImage = image;
    }

    this.ctx.drawImage(image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  clearText() {
    this.clearCanvas();
    if(this.backgroundImage) this.drawImage(this.backgroundImage, true);
    if(this.foregroundImage) this.drawImage(this.foregroundImage, false);
  }

  writeText(text: string, fontSize: number, reduceYBy: number) {
    this.clearText();
    this.ctx.font = `${fontSize}px Rubik-Regular`;

    let maxX = 963;
    let currentX = 125;
    let currentY = 840 - reduceYBy;

    for(const word of text.split(" ")) {
      const cleanText = word.replace(/\*\*/g, "") + " ";
      if(word.startsWith("**")) {
        this.ctx.font = `${fontSize}px Rubik-Bold`;
      }

      this.ctx.fillText(cleanText, currentX, currentY);
      currentX += this.ctx.measureText(cleanText).width;

      if(currentX >= maxX) {
        currentX = 125;
        currentY += 45;
      }

      if(word.endsWith("**")) {
        this.ctx.font = `${fontSize}px Rubik-Regular`;
      }
    }
  }

  changeTitle(text: string) {
    this.title = text;
  }

  download() {
    const link = document.createElement("a");
    link.download = `${this.title}.png`;
    link.href = this.ctx.canvas.toDataURL();
    link.click();
  }
}
