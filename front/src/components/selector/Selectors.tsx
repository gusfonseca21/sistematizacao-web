import { useState } from 'react';
import SpecialtySelector from './SpecialtySelector';
import DoctorSelector from './DoctorSelector';
import DateSelector from './DateSelector';

interface Props {
  doctorId: string;
  setDocorIdHandler: (value: string) => void;
  setDateHandler: (value: string) => void;
}

export default function Selectors({
  doctorId,
  setDocorIdHandler,
  setDateHandler
}: Props) {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('');

  function setSelectedSpecialtyIdHandler(specialtyId: string) {
    setSelectedDoctorIdHandler('');
    setSelectedSpecialtyId(specialtyId);
  }

  function setSelectedDoctorIdHandler(doctorId: string) {
    setDocorIdHandler(String(doctorId));
  }

  return (
    <div className="flex flex-row gap-10">
      <SpecialtySelector setSpecialtyId={setSelectedSpecialtyIdHandler} />
      <DoctorSelector
        specialtyId={selectedSpecialtyId}
        setDoctorId={setSelectedDoctorIdHandler}
      />
      <DateSelector doctorId={doctorId} setDateHandler={setDateHandler} />
    </div>
  );
}
