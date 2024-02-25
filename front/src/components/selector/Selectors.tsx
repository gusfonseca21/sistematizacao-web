import React, { useState } from 'react';
import SpecialtySelector from './SpecialtySelector';
import DoctorSelector from './DoctorSelector';
import DateSelector from './DateSelector';

export default function Selectors() {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<
    number | undefined
  >(undefined);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>(
    undefined
  );

  function setSelectedSpecialtyIdHandler(specialtyId: number) {
    setSelectedSpecialtyId(specialtyId);
  }

  function setSelectedDoctorIdHandler(doctorId: number) {
    setSelectedDoctorId(doctorId);
  }

  return (
    <div className="flex flex-row gap-10">
      <SpecialtySelector setSpecialtyId={setSelectedSpecialtyIdHandler} />
      <DoctorSelector
        specialtyId={selectedSpecialtyId}
        setDoctorId={setSelectedDoctorIdHandler}
      />
      <DateSelector doctorId={selectedDoctorId} />
    </div>
  );
}
