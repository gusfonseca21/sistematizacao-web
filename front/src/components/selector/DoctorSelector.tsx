import Select from 'react-select';
import docIcon from '../../assets/physician-profession-doctor-medic-svgrepo-com.svg';
import SelectorWrapper from './SelectorWrapper';

export default function DoctorSelector() {
  return (
    <SelectorWrapper>
      <img src={docIcon} alt="Ícone especialidade" className="h-10" />
      <Select
        placeholder="Profissional"
        options={[
          { value: 1, label: 'Jefferson Caminhões' },
          { value: 2, label: 'Enola Gay' }
        ]}
        className="w-full"
      />
    </SelectorWrapper>
  );
}
