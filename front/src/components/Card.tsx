import SpecialtySelector from './selector/SpecialtySelector';
import DoctorSelector from './selector/DoctorSelector';
import DateSelector from './selector/DateSelector';

export default function Card() {
  return (
    <div className="min-h-[25rem] w-[60rem] overflow-hidden rounded-[50px] bg-[#E0F6F7] px-12 font-sans shadow-lg">
      <div className="flex h-14 w-full flex-row items-center justify-center ">
        <span className="text-xl font-semibold text-custom-text">
          Faça seu agendamento
        </span>
      </div>
      <div className="flex size-full flex-row justify-between ">
        <SpecialtySelector />
        <DoctorSelector />
        <DateSelector />
      </div>
    </div>
  );
}
