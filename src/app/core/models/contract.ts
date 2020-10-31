import { Property } from './property';
import { Tenant } from './tenant';

export interface Contract {
  userId?: number;
  id?: number;
  tenantId?: number;
  start?: string;
  end?: string;
  propertyId?: number;
  properties?: Property[];
  directDebit?: boolean;
  duration?: string;
  tenant?: Tenant;
  nDocs?: number;
  nNotes?: number;
  pending?: {
    nPendingPayments?: number;
    qPendingPayments?: number;
  };
  incomes?: {
    nIncomes?: number;
    qIncomes?: number;
  };
}

export interface ContractDoc {
  id?: number;
  contractId?: number;
  date?: string;
  name?: string;
  path?: string;
  size?: number;
}