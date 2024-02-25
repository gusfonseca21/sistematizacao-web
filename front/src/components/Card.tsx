import Inputs from './inputs/Inputs';
import Selectors from './selector/Selectors';

export default function Card() {
  return (
    <div className="min-h-[25rem] w-[60rem] overflow-hidden rounded-[50px] bg-[#E0F6F7] px-12 font-sans shadow-lg">
      <div className="flex h-14 w-full flex-row items-center justify-center ">
        <span className="text-xl font-semibold text-custom-text">
          Faça seu agendamento
        </span>
      </div>
      <div className="flex flex-col items-center gap-10">
        <Selectors />
        <Inputs />
        <button className="h-16 w-[17rem] rounded-xl bg-blue-600 p-2 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:translate-y-[0.5] active:shadow-lg">
          Marcar consulta
        </button>
      </div>
    </div>
  );
}
