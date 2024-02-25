import React from 'react';
import NameInput from './NameInput';
import CPFInput from './CPFInput';

export default function Inputs() {
  return (
    <div className="flex flex-row gap-10">
      <NameInput />
      <CPFInput />
    </div>
  );
}
