import Select from 'react-select';
import specIcon from '../../assets/medical-prescription-svgrepo-com.svg';
import SelectorWrapper from './SelectorWrapper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Specialty } from '@shared/index';

interface Props {
  setSpecialtyId: (id_specialty: number) => void;
}

const URL = import.meta.env.VITE_BACKEND_URL;

async function getAllSpecialties() {
  try {
    const { data, status } = await axios.get(`${URL}/appointments/specialties`);

    if (status !== 200) {
      throw new Error('Resposta inesperada');
    }

    return data as Specialty[];
  } catch (error) {
    console.error('Houve um erro ao retornar as especialidades: ', error);
    return undefined;
  }
}

const customStyles = {
  //@ts-expect-error erro do tipo de estilo
  option: (styles) => ({
    ...styles,
    cursor: 'pointer'
  }),
  //@ts-expect-error erro do tipo de estilo
  control: (styles) => ({
    ...styles,
    cursor: 'pointer'
  })
};

export default function SpecialtySelector({ setSpecialtyId }: Props) {
  const [specialties, setSpecialties] = useState<Specialty[] | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const data = await getAllSpecialties();
      if (!data) return;
      setSpecialties(data);
    })();
  }, []);

  return (
    <SelectorWrapper>
      <img src={specIcon} alt="Ícone especialidade" className="h-10" />
      <Select
        placeholder="Especialidade"
        options={specialties}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id.toString()}
        onChange={(newValue) => setSpecialtyId(Number(newValue?.id))}
        className="w-full"
        maxMenuHeight={200}
        styles={customStyles}
      />
    </SelectorWrapper>
  );
}
