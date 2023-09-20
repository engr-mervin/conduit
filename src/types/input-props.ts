export interface InputProps
  extends InputPropsDeclared,
    InputPropsFromHook,
    React.ComponentProps<"input"> {}

export interface InputPropsDeclared {
  validatingFunction: (inputString: string) => boolean;
  label: string;
  isRequired?: boolean;
  field: string;
  initialValue?: string;
  inputType?: string;
}

export interface InputPropsFromHook {
  addTouch: (touchFunction: () => void) => void;
  removeTouch: (touchFunction: () => void) => void;
  mutateFormData: (key: string, value: string) => void;
  mutateFormValidity: (key: string, value: boolean) => void;
}
