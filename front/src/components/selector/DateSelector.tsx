import React, { ReactNode, useEffect, useState } from 'react';
import SelectorWrapper from './SelectorWrapper';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelectorStyle.css';
import calendarIcon from '../../assets/calendar-days-svgrepo-com.svg';
import { setHours, setMinutes, parseISO, addDays } from 'date-fns';
import axios from 'axios';
import { Appointment } from '@shared/index';

interface DateContainerProps {
  className: string;
  children: ReactNode;
}

interface DateSelectorProps {
  doctorId: string | undefined;
  setDateHandler: (value: string) => void;
}

function DateContainer({ className, children }: DateContainerProps) {
  return (
    <CalendarContainer
      className={`border-custom-light-grey !overflow-hidden !rounded-xl !border ${className}`}
    >
      {children}
    </CalendarContainer>
  );
}

const URL = import.meta.env.VITE_BACKEND_URL;

async function getDoctorDates(doctorId: string) {
  try {
    const { data, status } = await axios.get(
      `${URL}/appointments/dates?id_doctor=${doctorId}`
    );

    if (status !== 200) {
      throw new Error('Resposta inesperada');
    }

    return data as Appointment[];
  } catch (error) {
    console.error('Houve um erro ao retornar as datas do médico: ', error);
    return;
  }
}

const now = new Date();

const datePos18H = now.getHours() >= 17 ? addDays(now, 1) : now;

export default function DateSelector({
  doctorId,
  setDateHandler
}: DateSelectorProps) {
  const [doctorDates, setDoctorDates] = useState<Appointment[] | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timesToExclude, setTimesToExclude] = useState<Date[] | undefined>(
    undefined
  );

  // Quando selecionamos o dia, checará e setará os horários indisponíveis
  useEffect(() => {
    updateAvailableDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, doctorDates]);

  useEffect(() => {
    if (!doctorId) return;
    setSelectedDate(undefined);
    (async () => {
      const data = await getDoctorDates(doctorId);
      if (!data) return;
      setDoctorDates(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  function updateAvailableDates() {
    if (!doctorDates || !selectedDate) return;
    /* Verifica as consultas marcadas do médico e as exclui do calendário caso o usuário
    selecione o dia dessas consultas */
    const appointDates = doctorDates
      ?.map((appoint) => parseISO(appoint.date))
      .filter((appoint) => appoint.getDate() === selectedDate.getDate())
      .map((appoint) =>
        setHours(setMinutes(now, appoint.getMinutes()), appoint.getHours())
      );

    const selectedDateDay = selectedDate.getDate();
    const nowDay = now.getDate();
    const nowHour = now.getHours();

    // Exclui os horários já passados no dia atual
    // Se o horário passar das 17:30, exclui o dia atual do calendário
    for (
      let dayHour = 6;
      dayHour <= 17 && selectedDateDay === nowDay;
      dayHour++
    ) {
      if (nowHour >= dayHour) {
        appointDates.push(setHours(setMinutes(now, 0), dayHour));
      }
    }

    setTimesToExclude(appointDates);
  }

  return (
    <SelectorWrapper>
      <img src={calendarIcon} alt="Ícone especialidade" className="h-10" />
      <ReactDatePicker
        key={doctorId}
        disabled={!doctorId}
        toggleCalendarOnIconClick
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date ?? now);
          setDateHandler(String(date) ?? now);
        }}
        showTimeSelect
        //@ts-expect-error react-datepicker não reconhece locale de date-fns como tipo válido
        locale={ptBR}
        dateFormat="dd/MM/yyyy 'às' HH:mm"
        placeholderText="Data"
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className={`!focus:border-red-500 w-full ${
          !doctorId ? 'cursor-not-allowed' : 'cursor-pointer'
        } border-custom-light-grey rounded-[4px] border border-opacity-40 p-[0.4rem] ${
          !doctorId ? 'bg-[#F2F2F2]' : 'bg-white'
        }`}
        onCalendarOpen={() => setSelectedDate(datePos18H)}
        calendarContainer={DateContainer}
        minTime={setHours(setMinutes(now, 0), 6)}
        maxTime={setHours(setMinutes(now, 0), 17)}
        excludeTimes={timesToExclude}
        minDate={datePos18H}
        timeIntervals={60}
      />
    </SelectorWrapper>
  );
}
