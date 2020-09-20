export interface Property {
  userId?: number;
  id?: number;
  address?: string;
  type?: string;
  catastralReference?: string;
  country?: string;
  cp?: string;
  adquisitionValue?: number;
  adquisitionDate?: Date;
  avaliable?: boolean;
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
  nContracts?: number;
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