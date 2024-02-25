import React, { useState } from 'react';
import InputWrapper from './InputWrapper';

function CPFMask(value: string) {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export default function CPFInput() {
  const [CPF, setCPF] = useState<string | undefined>(undefined);

  return (
    <InputWrapper>
      <input
        placeholder="Seu CPF"
        maxLength={14}
        name="documentId"
        value={CPF}
        onChange={(e) => setCPF(CPFMask(e.target.value))}
        className="justify-center px-1 py-2 text-center text-custom-text outline-none"
      />
    </InputWrapper>
  );
}
