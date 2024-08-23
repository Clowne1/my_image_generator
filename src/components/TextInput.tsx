import React from 'react';

interface TextInputProps {
  label: string;
  text: {
    value: string;
    color: string;
    x: number;
    y: number;
    align: string;
  };
  setText: React.Dispatch<React.SetStateAction<typeof Text>>;
}

const TextInput: React.FC<TextInputProps> = ({ label, text, setText }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={text.value}
        onChange={(e) => setText({ ...text, value: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        rows={3}
      />
      <div className="flex space-x-4">
        <input
          type="color"
          value={text.color}
          onChange={(e) => setText({ ...text, color: e.target.value })}
          className="mt-1 block h-10 w-20 rounded-md cursor-pointer"
        />
        <select
          value={text.align}
          onChange={(e) => setText({ ...text, align: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <input
          type="number"
          value={text.x}
          onChange={(e) => setText({ ...text, x: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="X offset"
        />
        <input
          type="number"
          value={text.y}
          onChange={(e) => setText({ ...text, y: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Y offset"
        />
      </div>
    </div>
  );
};

export default TextInput;
