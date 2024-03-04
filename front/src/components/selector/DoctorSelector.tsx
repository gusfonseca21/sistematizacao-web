import Select from 'react-select';
import docIcon from '../../assets/physician-profession-doctor-medic-svgrepo-com.svg';
import SelectorWrapper from './SelectorWrapper';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Doctor = {
  id: number;
  name: string;
  id_specialty: number;
};

interface Props {
  specialtyId: string;
  setDoctorId: (doctorId: string) => void;
}

const URL = import.meta.env.VITE_BACKEND_URL;

async function getDoctorsBySpecialty(specialtyId: string) {
  try {
    const { data, status } = await axios.get(
      `${URL}/appointments/doctors?id_specialty=${specialtyId}`
    );

    if (status !== 200) {
      throw new Error('Resposta inesperada');
    }

    return data as Doctor[];
  } catch (error) {
    console.error(
      'Houve um erro ao retornar os médicos dessa especialidade: ',
      error
    );
    return;
  }
}

export default function DoctorSelector({ specialtyId, setDoctorId }: Props) {
  const [doctors, setDoctors] = useState<Doctor[] | undefined>(undefined);

  useEffect(() => {
    if (specialtyId) {
      setDoctors(undefined);
      (async () => {
        const data = await getDoctorsBySpecialty(specialtyId);
        if (!data) return;
        setDoctors(data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialtyId]);

  const customStyles = {
    //@ts-expect-error erro do tipo de estilo
    option: (styles) => ({
      ...styles,
      cursor: 'pointer'
    }),
    //@ts-expect-error erro do tipo de estilo
    control: (styles) => ({
      ...styles,
      cursor: specialtyId ? 'pointer' : 'not-allowed'
    })
  };

  return (
    <SelectorWrapper>
      <img src={docIcon} alt="Ícone especialidade" className="h-10" />
      <Select
        key={specialtyId}
        placeholder="Profissional"
        isDisabled={!doctors}
        options={doctors}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id.toString() as string}
        onChange={(newValue) => {
          if (!newValue) return;
          // @ts-expect-error Erro em relação ao tipo esperado de newValue
          setDoctorId(newValue?.id);
        }}
        className="!pointer-events-auto w-full"
        maxMenuHeight={200}
        styles={customStyles}
      />
    </SelectorWrapper>
  );
}
