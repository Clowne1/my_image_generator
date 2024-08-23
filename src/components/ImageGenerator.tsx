'use client';

import React, { useState, useRef, useEffect } from 'react';
import TextInput from './TextInput';

const ImageGenerator: React.FC = () => {
  const [bgColor, setBgColor] = useState('#0600eb');
  const [text1, setText1] = useState({ value: '', color: '#02029e', x: 0, y: 30, align: 'left', font: 'HuiWenMingTi' });
  const [text2, setText2] = useState({ value: '', color: '#d13474', x: 0, y: 25, align: 'left', font: 'HuiWenMingTi' });
  const [fontLoaded, setFontLoaded] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

  const previewWidth = 300;
  const previewHeight = 400;
  const actualWidth = 900;
  const actualHeight = 1200;

  const fontOptions = ['HuiWenMingTi', 'Arial', 'Verdana', 'Times New Roman'];

  useEffect(() => {
    const font = new FontFace('HuiWenMingTi', 'url(/fonts/汇文明朝体.otf)');
    font.load().then(() => {
      document.fonts.add(font);
      setFontLoaded(true);
    }).catch((error) => {
      console.error('Error loading font:', error);
      setFontLoaded(true); // Set to true even on error to allow rendering
    });
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      generateImage();
    }
  }, [bgColor, text1, text2, fontLoaded]);

  const generateImage = () => {
    const previewCanvas = previewCanvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    if (!previewCanvas || !hiddenCanvas) return;

    const previewCtx = previewCanvas.getContext('2d');
    const hiddenCtx = hiddenCanvas.getContext('2d');
    if (!previewCtx || !hiddenCtx) return;

    // Generate on hidden canvas
    hiddenCtx.fillStyle = bgColor;
    hiddenCtx.fillRect(0, 0, actualWidth, actualHeight);
    drawMultilineText(hiddenCtx, text1, 3);
    drawMultilineText(hiddenCtx, text2, 3);

    // Draw scaled version on preview canvas
    previewCtx.drawImage(hiddenCanvas, 0, 0, actualWidth, actualHeight, 0, 0, previewWidth, previewHeight);
  };

  const drawMultilineText = (ctx: CanvasRenderingContext2D, textObj: typeof text1, scale: number) => {
  ctx.fillStyle = textObj.color;
  const fontSize = 20 * scale;
  ctx.font = `bold ${fontSize}px "${textObj.font}", sans-serif`;
  ctx.textAlign = textObj.align as CanvasTextAlign;

  const maxWidth = actualWidth - 10 * scale; // 30px padding on each side
  const lineHeight = fontSize * 1.2;

  let lines = textObj.value.split('\n');
  let y = textObj.y * scale;

  lines.forEach((line) => {
    let currentLine = '';
    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      let testLine = currentLine + char;
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxWidth && currentLine !== '') {
        drawAlignedText(ctx, currentLine, textObj.x * scale, y, textObj.align, actualWidth);
        currentLine = char;
        y += lineHeight;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine !== '') {
      drawAlignedText(ctx, currentLine, textObj.x * scale, y, textObj.align, actualWidth);
      y += lineHeight;
    }
  });
};

  const drawAlignedText = (
    ctx: CanvasRenderingContext2D, 
    text: string, 
    x: number, 
    y: number, 
    align: string, 
    canvasWidth: number
  ) => {
    switch(align) {
      case 'center':
        ctx.textAlign = 'center';
        ctx.fillText(text, canvasWidth / 2, y);
        break;
      case 'right':
        ctx.textAlign = 'right';
        ctx.fillText(text, canvasWidth - 30, y);
        break;
      default:
        ctx.textAlign = 'left';
        ctx.fillText(text, 30, y);
    }
  };

  const saveImage = () => {
    const hiddenCanvas = hiddenCanvasRef.current;
    if (!hiddenCanvas) return;

    const dataUrl = hiddenCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'generated-image.png';
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-8">
      <div className="w-full md:w-1/2 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10 rounded-md cursor-pointer"
          />
        </div>
        <TextInput
          label="Text 1"
          text={text1}
          setText={setText1}
        />
        <TextInput
          label="Text 2"
          text={text2}
          setText={setText2}
        />
        <button
          onClick={saveImage}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Image
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <canvas
          ref={previewCanvasRef}
          width={previewWidth}
          height={previewHeight}
          className="border border-gray-300 w-full h-auto"
        ></canvas>
        <canvas
          ref={hiddenCanvasRef}
          width={actualWidth}
          height={actualHeight}
          className="hidden"
        ></canvas>
      </div>
    </div>
  );
};

export default ImageGenerator;