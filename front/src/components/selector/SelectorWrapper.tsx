import React, { ReactNode } from 'react';

interface SelectorWrapperProps {
  children: ReactNode;
}

export default function SelectorWrapper({ children }: SelectorWrapperProps) {
  return (
    <div className=" flex h-16 w-[17rem] items-center gap-2 rounded-xl bg-white p-2 shadow-md">
      {children}
    </div>
  );
}
