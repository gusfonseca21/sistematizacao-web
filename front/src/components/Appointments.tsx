import React, { useEffect, useState } from 'react';
import Selectors from './selector/Selectors';
import axios, { isAxiosError } from 'axios';
import { format, sub } from 'date-fns';
import Inputs from './inputs/Inputs';

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Appointments() {
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
      const response = await axios.post(`${URL}/appointments/dates`, {
        cpf: patientCpf,
        name: patientName,
        id_doctor: doctorId,
        date: format(sub(date, { hours: 3 }), 'yyyy-MM-dd HH:mm:ss.SSS')
      });

      if (response.status === 409) console.log('BUCETA');

      setSuccess('Sua consulta foi marcada com sucesso!');
      setTimeout(() => setSuccess(null), 5000);
      resetInputs();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          const errorText =
            'Erro ao marcar nova consulta. O paciente já possui uma consulta neste horário.';
          console.error('Erro ao marcar consulta: ', error);
          setError(errorText);
        } else {
          console.error('Erro ao marcar consulta: ', error);
          setError('Erro ao marcar consulta, tente novamente mais tarde.');
        }
      } else {
        console.error('Erro ao marcar consulta: ', error);
        setError('Erro ao marcar consulta, tente novamente mais tarde.');
      }
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
    <div key={success}>
      <div className="mb-5 flex h-14 w-full flex-row items-center justify-center">
        <h3 className="text-xl font-semibold">Marque sua consulta</h3>
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
