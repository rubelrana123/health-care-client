import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
 

interface InputFieldErrorProps {
  field: string;
  state: IInputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (getInputFieldError(field, state)) {
    return (
      <p className="text-red-600">
        {getInputFieldError(field, state)}
      </p>
    );
  }

  return null;
};

export default InputFieldError;