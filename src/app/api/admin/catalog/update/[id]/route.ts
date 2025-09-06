import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db';
import Catalog from '@/models/Catalog.model';
import { Types } from 'mongoose';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectMongoDB();

  const catalogId = params.id;

  if (!Types.ObjectId.isValid(catalogId)) {
    return NextResponse.json({ success: false, error: 'Invalid catalog ID' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());

    const {
      productName,
      brandName,
      title,
      description,
      color,
      price,
      discountPrice,
      styleCode,
      pattern,
      packOf,
      occasion,
      decorativeMaterial,
      constructionType,
      fabricCare,
      otherDetails,
      fabric,
      type,
      blousePiece,
      sariStyle,
      netQuantity,
      sariLength,
      blousePieceLength,
      weight,
      fragranceClassification,
      idealFor,
      Quantity,
      countryofOrigin,
      salesPackage,
      fragranceFamily,
      fragranceSegment,
      baseNote,
      heartNote,
      topNote,
      brand,
      modelName,
      maximumShelfLife,
      imageUrl,
    } = body;

    const updateData: Record<string, FormDataEntryValue> = {
      productName,
      brandName,
      title,
      description,
      color,
      price,
      discountPrice,
      styleCode,
      pattern,
      packOf,
      occasion,
      decorativeMaterial,
      constructionType,
      fabricCare,
      otherDetails,
      fabric,
      type,
      blousePiece,
      sariStyle,
      netQuantity,
      sariLength,
      blousePieceLength,
      weight,
      fragranceClassification,
      idealFor,
      Quantity,
      countryofOrigin,
      salesPackage,
      fragranceFamily,
      fragranceSegment,
      baseNote,
      heartNote,
      topNote,
      brand,
      modelName,
      maximumShelfLife,
    };

    // Only update imageUrl if a new image is provided
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedCatalog = await Catalog.findByIdAndUpdate(catalogId, updateData, {
      new: true,
    });

    if (!updatedCatalog) {
      return NextResponse.json({ success: false, error: 'Catalog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Catalog updated successfully', catalog: updatedCatalog }, { status: 200 });
  } catch (error) {
    console.error('Error updating catalog:', error);
    return NextResponse.json({ success: false, error: 'Failed to update catalog' }, { status: 500 });
  }
};
