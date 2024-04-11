export interface IProperty {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: ILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: IRates;
  seller_info: ISellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAddPropertyForm {
  type: string;
  name: string;
  description: string;
  location: ILocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: IRates;
  seller_info: ISellerInfo;
  images?: string[];
}

export interface ILocation {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IRates {
  weekly?: number | string;
  monthly?: number | string;
  nightly?: number | string;
}

export interface ISellerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ISellerInfo {
  name: string;
  email: string;
  phone: string;
}
