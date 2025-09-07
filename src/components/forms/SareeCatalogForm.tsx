'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useParams, useRouter } from 'next/navigation';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormInput from '../UIComponents/FormInput';
import {
  CatalogTitle,
  ImageChildContainer,
  SareeCatalogButtonContainer,
  SareeCatalogChildContainer,
  SareeCatalogContainer,
  SareeCatalogMainContainer,
} from './SareeCatalogForm.styled';
import { ViewSareeCatalogData } from '@/services/admin/saree-catalog/type';
import { addCatalog, getbyIdCatalog, updateCatalog } from '@/services/admin/saree-catalog/sareeCatalog';
import { basicSareeFields, productSareeFields } from '@/constants/form.constants';
import { convertToBase64 } from '@/utils/convertToBase64';
import DragAndDropSingleImage from '../UIComponents/DragAndDropSingleImage';
import { LoadingState } from '@/types/table';
import Loader from '../Loader';
import CircularLoader from '../CircularLoader';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  discountPrice: Yup.number().required('Discount Price is required'),
});
const SareeCatalogForm = () => {
  const { id: sareeId } = useParams();
  const router = useRouter();
  const [sareeData, setSareeData] = useState<ViewSareeCatalogData>();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isProgress: false,
  });
  const initialValues = {
    productName: 'Saree',
    brandName: '',
    title: '',
    description: '',
    color: '',
    price: '',
    discountPrice: '',
    styleCode: '',
    pattern: '',
    packOf: '',
    occasion: '',
    decorativeMaterial: '',
    constructionType: '',
    fabricCare: '',
    otherDetails: '',
    fabric: '',
    type: '',
    blousePiece: '',
    sariStyle: '',
    netQuantity: '',
    sariLength: '',
    blousePieceLength: '',
    weight: '',
    imageUrl: '',
    imageFileId: '',
  };

  const {
    errors,
    values,
    touched,
    setFieldValue,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldError,
    setSubmitting,
    setTouched,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = async (formData) => {
    try {
      let imageUrl = formData.imageUrl;
      let imageFileId = formData.imageFileId;

      if (selectedImageFile) {
        const base64 = await convertToBase64(selectedImageFile);
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64,
            fileName: selectedImageFile.name,
          }),
        });

        const data = await res.json();

        if (data.url) {
          imageUrl = data.url;
          imageFileId = data.fileId;
          toast.success('Image uploaded successfully');
        } else {
          toast.error(data.error || 'Image upload failed');
          return;
        }
      }

      const payload = {
        ...formData,
        imageUrl,
        imageFileId,
      };

      const res = sareeId ? await updateCatalog(sareeId, payload) : await addCatalog(payload);
      if (typeof res !== 'string' && res.success) {
        toast.success('Catalog ' + (sareeId ? 'updated' : 'added') + ' successfully');
        router.push('/admin/catalog');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  const handleGetSareeById = async (id) => {
    setLoading((prev) => ({ ...prev, setLoading: true }));
    try {
      const res = await getbyIdCatalog(id);
      if (typeof res !== 'string' && res.success) {
        setSareeData(res.catalog);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
      toast.error('Error fetching data.');
    } finally {
      setLoading((prev) => ({ ...prev, setLoading: false }));
    }
  };
  useEffect(() => {
    if (sareeId) {
      handleGetSareeById(sareeId as string);
    }
  }, [sareeId]);

  useEffect(() => {
    if (sareeId) {
      setValues({
        ...values,
        productName: sareeData?.productName || '',
        brandName: sareeData?.brandName || '',
        title: sareeData?.title || '',
        description: sareeData?.description || '',
        color: sareeData?.color || '',
        price: sareeData?.price?.toString() || '',
        discountPrice: sareeData?.discountPrice?.toString() || '',
        styleCode: sareeData?.styleCode || '',
        pattern: sareeData?.pattern || '',
        packOf: sareeData?.packOf?.toString() || '',
        occasion: sareeData?.occasion || '',
        decorativeMaterial: sareeData?.decorativeMaterial || '',
        constructionType: sareeData?.constructionType || '',
        fabricCare: sareeData?.fabricCare || '',
        otherDetails: sareeData?.otherDetails || '',
        fabric: sareeData?.fabric || '',
        type: sareeData?.type || '',
        blousePiece: sareeData?.blousePiece || '',
        sariStyle: sareeData?.sariStyle || '',
        netQuantity: sareeData?.netQuantity?.toString() || '',
        sariLength: sareeData?.sariLength?.toString() || '',
        blousePieceLength: sareeData?.blousePieceLength?.toString() || '',
        weight: sareeData?.weight?.toString() || '',
        imageUrl: sareeData?.imageUrl || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sareeData]);
  return (
    <>
      {loading.isLoading ? (
        <Loader />
      ) : (
        <>
          {loading.isProgress && <CircularLoader isProgress={loading.isProgress} />}
          <SareeCatalogMainContainer>
            <CatalogTitle variant="h5">Add New Saree</CatalogTitle>
            <form onSubmit={handleSubmit}>
              <SareeCatalogContainer>
                <SareeCatalogChildContainer>
                  <Typography variant="h6" gutterBottom>
                    Basic Details
                  </Typography>
                  <Grid container spacing={1}>
                    {basicSareeFields.map((field) => (
                      <Grid size={{ xs: 12, md: field.multiline ? 12 : 6 }} key={field.name}>
                        <FormInput
                          fullWidth
                          label={field.label}
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={values[field.name] ?? ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched[field.name] && errors[field.name])}
                          helperText={
                            touched[field.name] && errors[field.name]
                              ? errors[field.name]
                              : field.type === 'number'
                                ? 'Enter numeric value only'
                                : ''
                          }
                          disabled={field.disabled || false}
                          multiline={field.multiline || false}
                          rows={field.rows || 1}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SareeCatalogChildContainer>

                <SareeCatalogChildContainer>
                  <Typography variant="h6" gutterBottom>
                    Product Details
                  </Typography>
                  <Grid container spacing={3}>
                    {productSareeFields.map((field) => (
                      <Grid size={{ xs: 12, md: 6 }} key={field.name}>
                        <FormInput
                          fullWidth
                          label={field.label}
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={values[field.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched[field.name] && errors[field.name])}
                          helperText={touched[field.name] && errors[field.name]}
                        />
                      </Grid>
                    ))}
                    <ImageChildContainer size={{ xs: 12, md: 12 }}>
                      <Typography variant="subtitle1">Upload Image</Typography>
                      <DragAndDropSingleImage
                        name="imageUrl"
                        setFieldValue={setFieldValue}
                        file={values.imageUrl}
                        error={touched.imageUrl && Boolean(errors.imageUrl)}
                        formik={{ setFieldValue, setFieldError, setTouched, touched, errors }}
                        onFileSelect={(file) => setSelectedImageFile(file)}
                      />
                    </ImageChildContainer>

                    {/* Submit Button */}
                    <Grid size={{ xs: 12 }}>
                      <SareeCatalogButtonContainer>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Link href="/admin/catalog">
                          <Button variant="contained">Back</Button>
                        </Link>
                      </SareeCatalogButtonContainer>
                    </Grid>
                  </Grid>
                </SareeCatalogChildContainer>
              </SareeCatalogContainer>
            </form>
          </SareeCatalogMainContainer>
        </>
      )}
    </>
  );
};

export default SareeCatalogForm;
