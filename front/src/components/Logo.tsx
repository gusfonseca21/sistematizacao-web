import React from 'react';
import clinicIcon from '../assets/Croce_medica.svg';

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={clinicIcon} alt="Logo Clínica" className="h-40" />
      <span className="font-raleway text-3xl font-extrabold italic text-custom-navy-blue">
        TECHLINIC
      </span>
      <p className="mt-3 font-raleway text-xl">
        O seu portal de consultas e exames online
      </p>
    </div>
  );
}
