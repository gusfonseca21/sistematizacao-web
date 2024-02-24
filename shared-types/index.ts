export type Specialty = {
  id: number;
  name: string;
};

export type Doctor = {
  id: number;
  name: string;
  id_specialty: number;
};

export type Patient = {
  id: number;
  cpf: string;
  name: string;
};

export type Appointment = {
  id: number;
  id_doctor: number;
  id_patient: number;
  date: string;
};
