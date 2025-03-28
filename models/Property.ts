import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    types: { type: String, required: true },
    description: { type: String },
    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [{ type: String }],
    rates: {
      weekly: { type: Number },
      monthly: { type: Number },
      nightly: { type: Number },
    },
    seller_info: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    images: [{ type: String }],
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);
export default Property;
