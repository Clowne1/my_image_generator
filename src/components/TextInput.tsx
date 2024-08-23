import React from 'react';

export type TextState = {
  value: string;
  color: string;
  x: number;
  y: number;
  align: string;
  font: string;
};

type TextInputProps = {
  label: string;
  text: TextState;
  setText: React.Dispatch<React.SetStateAction<TextState>>;
};

const TextInput: React.FC<TextInputProps> = ({ label, text, setText }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setText(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name="value"
        value={text.value}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <input
        type="color"
        name="color"
        value={text.color}
        onChange={handleChange}
        className="mt-1 block w-full h-10 rounded-md cursor-pointer"
      />
      <div className="flex space-x-2">
        <input
          type="number"
          name="x"
          value={text.x}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <input
          type="number"
          name="y"
          value={text.y}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <select
        name="align"
        value={text.align}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
      <select
        name="font"
        value={text.font}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="HuiWenMingTi">HuiWenMingTi</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
    </div>
  );
};

export default TextInput;
