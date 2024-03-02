import React from 'react';

interface Props {
  action: () => void;
  disabled: boolean;
  title: string;
}

export default function Button({ action, disabled, title }: Props) {
  return (
    <button
      onClick={action}
      className={`h-16 w-[17rem] rounded-xl ${
        disabled ? 'bg-gray-500' : 'bg-blue-600'
      } ${disabled ? 'pointer-events-none' : 'pointer-events-auto'} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } p-2 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:translate-y-[0.5] active:shadow-lg`}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
