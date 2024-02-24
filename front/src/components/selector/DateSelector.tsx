import React, { ReactNode, useState } from 'react';
import SelectorWrapper from './SelectorWrapper';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelectorStyle.css';
import calendarIcon from '../../assets/calendar-days-svgrepo-com.svg';
import { setHours, setMinutes } from 'date-fns';

interface DateContainerProps {
  className: string;
  children: ReactNode;
}

function DateContainer({ className, children }: DateContainerProps) {
  return (
    <CalendarContainer
      className={`!overflow-hidden !rounded-xl !border-none ${className}`}
    >
      {children}
    </CalendarContainer>
  );
}

export default function DateSelector() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <SelectorWrapper>
      <img src={calendarIcon} alt="Ícone especialidade" className="h-10" />
      <ReactDatePicker
        toggleCalendarOnIconClick
        selected={startDate}
        onChange={(date) => setStartDate(date ?? new Date())}
        showTimeSelect
        //@ts-expect-error react-datepicker não reconhece locale de date-fns como tipo válido
        locale={ptBR}
        dateFormat="dd/MM/yyyy 'às' HH:mm"
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className="!focus:border-red-500 w-full rounded-[4px] border border-custom-light-grey border-opacity-40 p-[0.4rem]"
        calendarContainer={DateContainer}
        minTime={setHours(setMinutes(new Date(), 0), 6)}
        maxTime={setHours(setMinutes(new Date(), 0), 18)}
      />
    </SelectorWrapper>
  );
}
