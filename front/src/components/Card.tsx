import { useEffect, useState } from 'react';
import Inputs from './inputs/Inputs';
import Selectors from './selector/Selectors';
import axios from 'axios';
import { format } from 'date-fns';

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Card() {
  const [doctorId, setDoctorId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientCpf, setPatientCpf] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (
      !doctorId.trim().length ||
      !date.trim().length ||
      !patientName.trim().length ||
      patientCpf.trim().length <= 10
    )
      setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [doctorId, date, patientName, patientCpf]);

  function setDocorIdHandler(value: string) {
    setDoctorId(value);
  }

  function setDateHandler(value: string) {
    setDate(value);
  }

  function setPatientNameHandler(value: string) {
    setPatientName(value);
  }

  function setPatientCpfHandler(value: string) {
    setPatientCpf(value);
  }

  async function createAppointment() {
    setError(false);
    try {
      const { status } = await axios.post(`${URL}/appointments/dates`, {
        cpf: patientCpf,
        name: patientName,
        id_doctor: doctorId,
        date: format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
      });

      if (status !== 201) {
        throw new Error(
          'Houve um erro ao marcar a consulta. Recarregue a página e tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro: ', error);
      setError(true);
    }
  }

  return (
    <div className="min-h-[25rem] w-[60rem] overflow-hidden rounded-[50px] bg-[#E0F6F7] px-12 font-sans shadow-lg">
      <div className="flex h-14 w-full flex-row items-center justify-center ">
        <span className="text-xl font-semibold text-custom-text">
          Faça seu agendamento
        </span>
      </div>
      <div className="flex flex-col items-center gap-10">
        <Selectors
          setDocorIdHandler={setDocorIdHandler}
          setDateHandler={setDateHandler}
        />
        <Inputs
          dateIsSet={!!date.trim()}
          setPatientCpfHandler={setPatientCpfHandler}
          setPatientNameHandler={setPatientNameHandler}
        />
        <div
          className={`${
            buttonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <button
            onClick={createAppointment}
            className={`h-16 w-[17rem] rounded-xl ${
              buttonDisabled ? 'bg-gray-500' : 'bg-blue-600'
            } ${
              buttonDisabled ? 'pointer-events-none' : 'pointer-events-auto'
            } ${
              buttonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } p-2 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl active:translate-y-[0.5] active:shadow-lg`}
            disabled={buttonDisabled}
          >
            Marcar consulta
          </button>
        </div>
        {error ? (
          <div className="-mt-5">
            <p className="text-red-500">
              Erro ao agendar uma consulta. Recarregue a página e tente
              novamente
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
