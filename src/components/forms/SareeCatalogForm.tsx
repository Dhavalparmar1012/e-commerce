'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';

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
import { addCatalog, updateCatalog } from '@/services/admin/saree-catalog/sareeCatalog';
import { basicSareeFields, productSareeFields } from '@/constants/form.constants';
import { convertToBase64 } from '@/utils/convertToBase64';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  discountPrice: Yup.number().required('Discount Price is required'),
});
const SareeCatalogForm = () => {
  const { id: productPerfumeId } = useParams();
  const [productData, setProductData] = useState<ViewSareeCatalogData>();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const initialValues = {
    productName: 'Saree',
    brandName: '',
    title: '',
    description: '',
    color: '',
    price: 0,
    discountPrice: 0,
    styleCode: '',
    pattern: '',
    packOf: 0,
    occasion: '',
    decorativeMaterial: '',
    constructionType: '',
    fabricCare: '',
    otherDetails: '',
    fabric: '',
    type: '',
    blousePiece: '',
    sariStyle: '',
    netQuantity: 0,
    sariLength: 0,
    blousePieceLength: 0,
    weight: 0,
    imageUrl: '',
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
    setSubmitting,
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
      let imageUrl = formData.imageUrl; // fallback if already set

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
          toast.success('Image uploaded successfully');
        } else {
          toast.error(data.error || 'Image upload failed');
          return; // ⛔ stop form submission if image upload fails
        }
      }

      const payload = {
        ...formData,
        imageUrl, // ✅ use uploaded image URL
      };

      const res = productPerfumeId ? await updateCatalog(productPerfumeId, formData) : await addCatalog(payload);
      if (typeof res !== 'string' && res.success) {
        toast.success('Product ' + (productPerfumeId ? 'updated' : 'added') + ' successfully');
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB.');
      return;
    }

    setSelectedImageFile(file); // ⬅️ just store, don't upload yet
  };

  return (
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
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched[field.name] && errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
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
              <ImageChildContainer size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1">Upload Image</Typography>
                <input
                  type="file"
                  name="imageUrl"
                  id="imageUrl"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                  }}
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
  );
};

export default SareeCatalogForm;
