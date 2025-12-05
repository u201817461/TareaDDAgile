import React from 'react';

interface InputControlProps {
  label: string;
  value: number | '';
  onChange: (val: number | '') => void;
  unit: string;
  min?: number;
  placeholder?: string;
  error?: string;
}

export const InputControl: React.FC<InputControlProps> = ({
  label,
  value,
  onChange,
  unit,
  min = 0,
  placeholder,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <div className="relative">
        <input
          type="number"
          min={min}
          step="any"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:outline-none transition-all shadow-sm ${
            error 
              ? 'border-red-400 focus:ring-red-200 bg-red-50' 
              : 'border-slate-300 focus:ring-blue-200 focus:border-blue-500'
          }`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium select-none">
          {unit}
        </span>
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};