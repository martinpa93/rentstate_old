export interface Property {
  userId?: number;
  id?: number;
  address?: string;
  type?: string;
  catastralReference?: string;
  country?: string;
  region?: string;
  city?: string;
  cp?: string;
  adquisitionValue?: number;
  adquisitionDate?: Date;
  avaliable?: boolean;
  nContracts?: number;
  incomes?: {
    nIncomes?: number;
    qIncomes?: number;
  };
  outgoings?: {
    nOutgoings?: number;
    qOutgoings?: number;
  }
  pending?: {
    nPendingPayments?: number;
    qPendingPayments?: number;
  };
  nDocs?: number;
  nNotes?: number;
}

export interface PropertyDoc {
  id?: number;
  propertyId?: number;
  date?: string;
  name?: string;
  path?: string;
  size?: number;
}