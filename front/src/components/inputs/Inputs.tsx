import React from 'react';
import NameInput from './NameInput';
import CPFInput from './CPFInput';

interface Props {
  dateIsSet: boolean;
  setPatientCpfHandler: (value: string) => void;
  setPatientNameHandler: (value: string) => void;
}

export default function Inputs({
  dateIsSet,
  setPatientCpfHandler,
  setPatientNameHandler
}: Props) {
  return (
    <div className="flex flex-row gap-10">
      <NameInput
        dateIsSet={dateIsSet}
        setPatientNameHandler={setPatientNameHandler}
      />
      <CPFInput
        dateIsSet={dateIsSet}
        setPatientCpfHandler={setPatientCpfHandler}
      />
    </div>
  );
}
