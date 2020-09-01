export interface Property {
  id: number;
  address: string;
  type: string;
  catastralReference: string;
  country: string;
  region?: string;
  city: string;
  cp: string;
  adquisitionValue: number;
  adquisitionDate: Date;
  avaliable?: boolean;
  nContracts?: number;
  nIncomes?: number;
  nOutgoings?: number;
  nPendingPayments?: number;
  nDocs?: number;
  nNotes?: number;
}

export interface PropertyDoc {
  id: number;
  propertyId: number;
  date: string;
  name: string;
  path: string;
  size: number;
}