export interface IInputErrorState {
  success: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}
export const getInputFieldError = (
  fieldName: string,
  state: IInputErrorState
) => {
    if (state && state.errors) {
      const error = state.errors.find((err) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
};