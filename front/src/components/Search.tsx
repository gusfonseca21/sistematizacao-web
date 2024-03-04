import React, { useEffect, useState } from 'react';
import CPFInput from './inputs/CPFInput';
import Button from './Button';
import axios, { isAxiosError } from 'axios';
import { format } from 'date-fns';

type ReturnedAppointment = {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  patient: string;
  canceled: number;
};

type CanceledState = {
  ['id']: number;
  ['canceled']: boolean;
};

const URL = import.meta.env.VITE_BACKEND_URL;

function AppointmentsTable({
  appointments
}: {
  appointments: ReturnedAppointment[];
}) {
  const [canceledState, setCanceledState] = useState<
    CanceledState[] | undefined
  >(undefined);

  useEffect(() => {
    setCanceledState(() =>
      appointments.map((appointment) => ({
        id: appointment.id,
        canceled: !!appointment.canceled
      }))
    );
  }, [appointments]);

  async function cancelAppointment(id_appointment: number) {
    try {
      await axios.patch(`${URL}/appointments/cancel`, {
        id_appointment
      });
      setCanceledState((prevState) => {
        return prevState?.map((prev) => {
          if (prev.id === id_appointment) {
            return { id: prev.id, canceled: true };
          } else {
            return prev;
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  const tdStyle = 'p-2';
  return (
    <table className="size-full">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Médico(a)</th>
          <th>Especialidade</th>
          <th>Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => {
          const appointmentState = canceledState?.find(
            (cancelApp) => cancelApp.id === appointment.id
          );
          return (
            <tr
              className={`p-2 text-center ${
                appointmentState?.canceled ? 'text-gray-400' : ''
              }`}
              key={appointment.id}
            >
              <td className={tdStyle}>{appointment.patient}</td>
              <td className={tdStyle}>{appointment.doctor}</td>
              <td className={tdStyle}>{appointment.specialty}</td>
              <td className={tdStyle}>
                {format(appointment.date, "dd/MM/yyyy 'às' HH:mm")}
              </td>
              <td className="flex h-full items-center justify-center">
                {!appointmentState?.canceled ? (
                  <div
                    onClick={() => cancelAppointment(appointment.id)}
                    className="inline-block h-6 cursor-pointer select-none items-center bg-red-600 px-2 text-center align-middle text-white transition active:bg-red-800"
                  >
                    Cancelar
                  </div>
                ) : (
                  'Cancelado'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Search() {
  const [appointments, setAppointments] = useState<
    ReturnedAppointment[] | undefined
  >(undefined);
  const [cpf, setCpf] = useState<string | undefined>(undefined);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!cpf?.trim().length || cpf.trim().length < 11) setBtnDisabled(true);
    else setBtnDisabled(false);
  }, [cpf]);

  function setPatientCpf(value: string) {
    setCpf(value);
  }

  async function getAppointments() {
    setAppointments([]);
    setError('');
    try {
      const { data } = await axios.get(`${URL}/appointments/search?cpf=${cpf}`);

      setAppointments(
        data.sort(
          (a: ReturnedAppointment, b: ReturnedAppointment) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.error('Erro ao buscar consultas: ', error);
          setError('Insira um CPF válido');
        } else if (error.response?.status === 404) {
          console.error('Erro ao buscar consultas: ', error);
          setError('Não existe um paciente cadastrado com esse CPF');
        } else {
          console.error('Erro ao buscar consultas: ', error);
          setError('Erro ao buscar consulta. Tente novamente mais tarde');
        }
      }
    }
  }

  return (
    <div>
      <div className="mb-5 flex h-14 w-full flex-row items-center justify-center">
        <h3 className="text-xl font-semibold">Busque uma consulta marcada</h3>
      </div>
      <div className="flex flex-col items-center gap-5">
        <CPFInput dateIsSet setPatientCpfHandler={setPatientCpf} />
        <Button
          action={getAppointments}
          disabled={btnDisabled}
          title="Buscar"
        />
        {error.trim().length ? <p className="text-red-500">{error}</p> : null}
        {appointments?.length ? (
          <div className="max-h-40 w-[55rem] overflow-hidden overflow-y-scroll rounded-lg bg-white shadow-md">
            <AppointmentsTable appointments={appointments} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
