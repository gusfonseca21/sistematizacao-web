import React, { useState } from 'react';
import SpecialtySelector from './SpecialtySelector';
import DoctorSelector from './DoctorSelector';
import DateSelector from './DateSelector';

interface Props {
  setDocorIdHandler: (value: string) => void;
  setDateHandler: (value: string) => void;
}

export default function Selectors({
  setDocorIdHandler,
  setDateHandler
}: Props) {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  function setSelectedSpecialtyIdHandler(specialtyId: string) {
    setSelectedSpecialtyId(specialtyId);
  }

  function setSelectedDoctorIdHandler(doctorId: string) {
    setSelectedDoctorId(String(doctorId));
    setDocorIdHandler(String(doctorId));
  }

  return (
    <div className="flex flex-row gap-10">
      <SpecialtySelector setSpecialtyId={setSelectedSpecialtyIdHandler} />
      <DoctorSelector
        specialtyId={selectedSpecialtyId}
        setDoctorId={setSelectedDoctorIdHandler}
      />
      <DateSelector
        doctorId={selectedDoctorId}
        setDateHandler={setDateHandler}
      />
    </div>
  );
}
