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
      className={`!overflow-hidden !rounded-xl !border border-custom-light-grey ${className}`}
    >
      {children}
    </CalendarContainer>
  );
}

const URL = import.meta.env.VITE_BACKEND_URL;

const NOW = new Date();

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

  function updateAvailableDates() {
    if (!doctorDates || !selectedDate) return;
    /* Verifica as consultas marcadas do médico e as bloqueiam no calendário caso o usuário
    selecione o dia dessas consultas */
    const appointDates = doctorDates
      ?.map((appoint) => parseISO(appoint.date))
      .filter((appoint) => appoint.getDate() === selectedDate.getDate())
      .map((appoint) =>
        setHours(setMinutes(NOW, appoint.getMinutes()), appoint.getHours())
      );

    setTimesToExclude(appointDates);
  }

  function isWeekend(date: Date): boolean {
    return date.getDay() !== 0 && date.getDay() !== 6;
  }

  function setDateOnCalendarOpen() {
    if (!selectedDate) {
      setSelectedDate(nowSkipWeekends());
    }
  }

  function nowSkipWeekends() {
    // Ao abrir o calendário o horário inicialmente selecionado sempre será 06:00
    const updatedDate = setMinutes(setHours(NOW, 6), 0);
    if (updatedDate.getDay() === 6) return addDays(updatedDate, 2);
    else return addDays(updatedDate, 1);
  }

  return (
    <SelectorWrapper>
      <img src={calendarIcon} alt="Ícone especialidade" className="h-10" />
      <ReactDatePicker
        key={doctorId}
        disabled={!doctorId}
        toggleCalendarOnIconClick
        openToDate={nowSkipWeekends()}
        // openToDate={NOW.getDay() === 6 ? addDays(NOW, 2) : addDays(NOW, 1)}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date ?? NOW);
          setDateHandler(String(date) ?? NOW);
        }}
        showTimeSelect
        onCalendarOpen={setDateOnCalendarOpen}
        //@ts-expect-error react-datepicker não reconhece locale de date-fns como tipo válido
        locale={ptBR}
        dateFormat="dd/MM/yyyy 'às' HH:mm"
        placeholderText="Data"
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className={`!focus:border-red-500 w-full ${
          !doctorId ? 'cursor-not-allowed' : 'cursor-pointer'
        } rounded-[4px] border border-custom-light-grey border-opacity-40 p-[0.4rem] ${
          !doctorId ? 'bg-[#F2F2F2]' : 'bg-white'
        }`}
        calendarContainer={DateContainer}
        minTime={setHours(setMinutes(NOW, 0), 6)}
        maxTime={setHours(setMinutes(NOW, 0), 17)}
        excludeTimes={timesToExclude}
        minDate={addDays(NOW, 1)}
        filterDate={(date) => isWeekend(date)}
        timeIntervals={60}
      />
    </SelectorWrapper>
  );
}
