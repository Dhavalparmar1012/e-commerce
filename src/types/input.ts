import { SxProps, Theme } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';

export interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  InputProps?: TextFieldProps['InputProps'];
}
