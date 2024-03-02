import { useState } from 'react';
import Appointments from './Appointments';
import Search from './Search';

const SELECTED_TAB_STYLE = 'border-b-2 border-b-custom-navy-blue';

const TAB_STYLE = 'flex h-14 w-44 items-center justify-center cursor-pointer';

interface TabsProps {
  selectedTab: number;
  selectTab: (value: number) => void;
}

function Tabs({ selectedTab, selectTab }: TabsProps) {
  return (
    <div
      className={`flex  flex-row items-center justify-start rounded-t-xl bg-custom-card`}
    >
      <p
        className={`${TAB_STYLE} ${
          selectedTab === 1 ? SELECTED_TAB_STYLE : ''
        }`}
        onClick={() => selectTab(1)}
      >
        Agendamento
      </p>
      <p
        className={`${TAB_STYLE} ${
          selectedTab === 2 ? SELECTED_TAB_STYLE : ''
        }`}
        onClick={() => selectTab(2)}
      >
        Busca
      </p>
    </div>
  );
}

export default function Card() {
  const [selectedTab, setSelectedTab] = useState(1);

  function selectTabHandler(value: number) {
    setSelectedTab(value);
  }

  return (
    <div className="relative min-h-[30rem] w-[60rem] overflow-hidden rounded-[50px]  bg-custom-card p-1 font-sans shadow-lg">
      <Tabs selectedTab={selectedTab} selectTab={selectTabHandler} />
      {selectedTab === 1 && <Appointments />}
      {selectedTab === 2 && <Search />}
    </div>
  );
}
