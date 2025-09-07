import { Schema, model, models } from 'mongoose';

interface ICatalog extends Document {
  productName: string;
  brandName: string;
  title: string;
  description: string;
  color: string;
  price: number;
  discountPrice: number;
  styleCode: string;
  pattern: string;
  packOf: number;
  occasion: string;
  decorativeMaterial: string;
  constructionType: string;
  fabricCare: string;
  otherDetails: string;
  fabric: string;
  type: string;
  blousePiece: string;
  sariStyle: string;
  netQuantity: number;
  sariLength: number;
  blousePieceLength: number;
  weight: number;
  fragranceClassification: string;
  idealFor: string;
  Quantity: number;
  countryofOrigin: string;
  salesPackage: string;
  fragranceFamily: string;
  fragranceSegment: string;
  baseNote: string;
  heartNote: string;
  topNote: string;
  brand: string;
  modelName: string;
  maximumShelfLife: number;
  imageUrl: string;
  imageFileId: string;
}

const catalogSchema = new Schema<ICatalog>(
  {
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    styleCode: { type: String },
    pattern: { type: String },
    packOf: { type: Number },
    occasion: { type: String },
    decorativeMaterial: { type: String },
    constructionType: { type: String },
    fabricCare: { type: String },
    otherDetails: { type: String },
    fabric: { type: String },
    type: { type: String },
    blousePiece: { type: String },
    sariStyle: { type: String },
    netQuantity: { type: Number },
    sariLength: { type: Number },
    blousePieceLength: { type: Number },
    weight: { type: Number },
    fragranceClassification: { type: String },
    idealFor: { type: String },
    Quantity: { type: Number },
    countryofOrigin: { type: String },
    salesPackage: { type: String },
    fragranceFamily: { type: String },
    fragranceSegment: { type: String },
    baseNote: { type: String },
    heartNote: { type: String },
    topNote: { type: String },
    brand: { type: String },
    modelName: { type: String },
    maximumShelfLife: { type: Number },
    imageUrl: { type: String, required: true },
    imageFileId: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the Saree model or create it if it doesn't already exist
const Catalog = models.Catalog || model<ICatalog>('Catalog', catalogSchema);

export default Catalog;
