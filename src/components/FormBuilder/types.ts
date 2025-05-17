export interface FormValues {
  formFields: FormFieldProps[];
}

export type FormFieldType = 'text' | 'select' | 'checkbox' | 'number' | 'textarea';

export interface FormFieldProps {
  id: string;
  type: FormFieldType;
  value: string;
  options?: FormFieldOptions[];
};

export interface FormFieldOptions {
  value: string;
}

export interface SupportedFormField {
  name: string;
  type: FormFieldType;
}
