'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TextInput, { TextState } from './TextInput';

const ImageGenerator: React.FC = () => {
  const [bgColor, setBgColor] = useState('#0600eb');
  const [text1, setText1] = useState<TextState>({ value: '', color: '#02029e', x: 0, y: 30, align: 'left', font: 'HuiWenMingTi' });
  const [text2, setText2] = useState<TextState>({ value: '', color: '#d13474', x: 0, y: 25, align: 'left', font: 'HuiWenMingTi' });
  const [fontLoaded, setFontLoaded] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

  const previewWidth = 300;
  const previewHeight = 400;
  const actualWidth = 900;
  const actualHeight = 1200;

  // ... (其余代码保持不变)

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
