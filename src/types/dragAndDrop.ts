import { FormikErrors, FormikTouched } from 'formik';
import { Theme, SxProps } from '@mui/material/styles';
import { CustomFile } from './dropzone';

export interface DragAndDropExcelPropsType {
  name: string;
  file: string | CustomFile[] | null;
  error: any;
  sx?: any;
  setFieldValue: Function;
  onUploadClick?: () => void;
}

export interface DragAndDropFilePropsType {
  name: string;
  error: any;
  file: string | CustomFile[] | null;
  sx?: any;
  setFieldValue: Function;
  onUploadClick?: () => void;
}

export type DragAndDropSingleFileProps = {
  name: string;
  error?: boolean;
  file: CustomFile[] | string;
  sx?: SxProps<Theme>;
  setFieldValue: (field: string, value: any) => void;
  formik: {
    setFieldValue: (field: string, value: any) => void;
    setFieldError: (field: string, message: string) => void;
    setTouched: (fields: Record<string, boolean>) => void;
    touched: FormikTouched<any>;
    errors: FormikErrors<any>;
  };
  onFileSelect?: (file: File | null) => void; // 🆕 add this
};

export type DragAndDropSinglePDFProps = {
  name: string;
  error?: boolean;
  file: CustomFile[] | string;
  sx?: SxProps<Theme>;
  setFieldValue: (field: string, value: any) => void;
};
