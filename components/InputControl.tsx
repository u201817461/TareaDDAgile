import React from 'react';

interface InputControlProps {
  label: string;
  value: number | '';
  onChange: (val: number | '') => void;
  unit: string;
  min?: number;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputControl: React.FC<InputControlProps> = ({
  label,
  value,
  onChange,
  unit,
  min = 0,
  placeholder,
  error,
  icon
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
    <div className="w-full group">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
          {icon && <span className="text-slate-400">{icon}</span>}
          {label}
        </label>
      </div>
      
      <div className="relative">
        <input
          type="number"
          min={min}
          step="any"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full bg-slate-50 text-slate-800 text-lg font-medium p-4 pr-12 rounded-xl border-2 transition-all outline-none placeholder:text-slate-300
            ${error 
              ? 'border-red-100 bg-red-50/50 focus:border-red-400' 
              : 'border-transparent hover:border-slate-200 focus:border-slate-900 focus:bg-white'
            }
          `}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none">
          {unit}
        </span>
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1 animate-pulse">
          • {error}
        </div>
      )}
    </div>
  );
};