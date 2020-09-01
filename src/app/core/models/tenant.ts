export interface Tenant {
  id: number;
  identity: string;
  type: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  nContracts?: number;
  nPendingPayments?: number;
  nPayments?: number;
  nDocs?: number;
}

export interface TenantDoc {
  id: number;
  tenantId: number;
  date: string;
  name: string;
  path: string;
  size: number;
}