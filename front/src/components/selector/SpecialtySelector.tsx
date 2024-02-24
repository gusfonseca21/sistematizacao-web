import Select from 'react-select';
import specIcon from '../../assets/medical-prescription-svgrepo-com.svg';
import SelectorWrapper from './SelectorWrapper';

export default function SpecialtySelector() {
  return (
    <SelectorWrapper>
      <img src={specIcon} alt="Ícone especialidade" className="h-10" />
      <Select
        placeholder="Especialidade"
        options={[
          { value: 'urologia', label: 'Urologia' },
          { value: 'dermatologia', label: 'Dermatologia' }
        ]}
        className="w-full"
      />
    </SelectorWrapper>
  );
}
