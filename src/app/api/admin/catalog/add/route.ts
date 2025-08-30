import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db';
import Catalog from '@/models/Catalog.model';

export const POST = async (req: NextRequest) => {
  await connectMongoDB();

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

    await Catalog.create({
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
    });

    return NextResponse.json({ success: true, message: 'Catalog registered.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Catalog creation failed' }, { status: 500 });
  }
};
