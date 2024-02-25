import React, { useState } from 'react';
import InputWrapper from './InputWrapper';

export default function NameInput() {
  const [name, setName] = useState<string | undefined>(undefined);

  return (
    <InputWrapper>
      <input
        type="text"
        placeholder="Seu nome"
        onChange={(e) => setName(e.target.value)}
        maxLength={25}
        minLength={5}
        value={name}
        className="justify-center px-1 py-2 text-center text-custom-text outline-none"
      />
    </InputWrapper>
  );
}
