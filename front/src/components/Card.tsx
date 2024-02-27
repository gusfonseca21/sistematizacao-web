import { useEffect, useState } from 'react';
import Inputs from './inputs/Inputs';
import Selectors from './selector/Selectors';
import axios from 'axios';
import { format, sub } from 'date-fns';

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Card() {
  const [doctorId, setDoctorId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientCpf, setPatientCpf] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    setError(null);

    if (!isDateValid() || !isNameValid) return;

    try {
      await axios.post(`${URL}/appointments/dates`, {
        cpf: patientCpf,
        name: patientName,
        id_doctor: doctorId,
        date: format(sub(date, { hours: 3 }), 'yyyy-MM-dd HH:mm:ss.SSS')
      });

      setSuccess('Sua consulta foi marcada com sucesso!');
      setTimeout(() => setSuccess(null), 5000);
      resetInputs();
    } catch (error) {
      //@ts-expect-error Typescript não vê a tipagem dos erros
      setError(error.response.data);
      console.error(error);
    }
  }

  function resetInputs() {
    setDoctorId('');
    setDate('');
    setPatientName('');
    setPatientCpf('');
    setButtonDisabled(true);
    setError(null);
  }

  function isDateValid(): boolean {
    const selectedDate = new Date(date);
    const now = new Date();

    // Se a data selecionada for passada ou fora do período de atendimento
    if (
      selectedDate.getTime() < now.getTime() ||
      selectedDate.getHours() < 6 ||
      selectedDate.getHours() >= 18
    ) {
      setError('Selecione uma data válida');
      return false;
    }

    return true;
  }

  function isNameValid(): boolean {
    if (!patientName.trim()) {
      setError('Insira um nome válido');
      return false;
    }

    return true;
  }

  return (
    <div
      key={success}
      className="min-h-[25rem] w-[60rem] overflow-hidden rounded-[50px] bg-[#E0F6F7] px-12 font-sans shadow-lg"
    >
      <div className="flex h-14 w-full flex-row items-center justify-center ">
        <span className="text-xl font-semibold">Faça seu agendamento</span>
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
            <p className="text-red-500">{error}</p>
          </div>
        ) : null}
        {success ? (
          <div className="-mt-5">
            <p className="text-green-500">{success}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
