'use client';

import React from 'react';

// MUI-MATERIAL IMPORT
import { TextField, Typography } from '@mui/material';

// TYPES
import { FormInputProps } from '@/types/input';

const FormInput = ({
  id,
  name,
  type = 'text',
  required = false,
  label,
  size = 'small',
  fullWidth = true,
  multiline = false,
  rows,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  InputProps,
  disabled = false,
  sx,
  ...props
}: FormInputProps) => (
  <TextField
    id={id}
    name={name}
    type={type}
    size={size}
    fullWidth={fullWidth}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    InputProps={InputProps}
    multiline={multiline}
    rows={rows}
    error={error}
    helperText={helperText}
    label={
      typeof label === 'string' ? (
        <Typography>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      ) : (
        label
      )
    }
    disabled={disabled}
    sx={sx}
    {...props}
  />
);

export default FormInput;
