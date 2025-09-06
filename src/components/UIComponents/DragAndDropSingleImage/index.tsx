'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { ErrorCode, FileError, useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { DragAndDropSingleFileProps } from '@/types/dragAndDrop';
import RejectionFiles from '@/components/third-party/dropzone/RejectionFiles';
import { CustomFile } from '@/types/dropzone';
import PlaceholderContent from './PlaceholderContent';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

const DragAndDropSingleImage = ({ error, file, sx, setFieldValue, name, formik, onFileSelect }: DragAndDropSingleFileProps) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    validator: (file: File) => {
      if (!file.type.includes('image/')) {
        return { message: 'Enter a valid image file.', code: ErrorCode.FileInvalidType } as FileError;
      }
      return null;
    },
    onDrop: async (acceptedFiles: CustomFile[]) => {
      if (!acceptedFiles.length) return;

      const [file] = acceptedFiles;
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.src = objectUrl;

      image.onload = () => {
        setLocalError(null);
        file.preview = objectUrl;
        setFieldValue(name, [file]);
        onFileSelect?.(file);
      };
    },
  });

  const onRemove = () => {
    setFieldValue(name, null);
    onFileSelect?.(null);
  };

  const renderImage = () => {
    if (!file) return null;

    const imageSrc = typeof file === 'string' ? file : Array.isArray(file) && file[0]?.preview ? file[0].preview : null;

    if (!imageSrc) return null;

    return (
      <CardMedia
        component="img"
        src={imageSrc}
        sx={{
          width: '100%',
          maxHeight: 300,
          objectFit: 'contain',
          borderRadius: 2,
          mt: 2,
        }}
      />
    );
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />
        {!file && <PlaceholderContent fileType="image" />}
        {renderImage()}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {(localError || (formik.touched[name] && formik.errors[name])) && (
        <Box sx={{ color: 'error.main', mt: 1, fontSize: 13 }}>
          {localError || (typeof formik.errors[name] === 'string' ? formik.errors[name] : '')}
        </Box>
      )}

      {file && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Remove
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default DragAndDropSingleImage;
