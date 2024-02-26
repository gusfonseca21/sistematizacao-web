import InputWrapper from './InputWrapper';

interface Props {
  dateIsSet: boolean;
  setPatientNameHandler: (value: string) => void;
}

export default function NameInput({ setPatientNameHandler, dateIsSet }: Props) {
  return (
    <InputWrapper>
      <input
        type="text"
        placeholder="Seu nome"
        onChange={(e) => setPatientNameHandler(e.target.value)}
        maxLength={25}
        minLength={5}
        className={`justify-center px-1 py-2 text-center text-custom-text outline-none  ${
          dateIsSet ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        disabled={!dateIsSet}
      />
    </InputWrapper>
  );
}
