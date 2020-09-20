export interface Tenant {
  userId?: number;
  id?: number;
  identity?: string;
  type?: string;
  name?: string;
  country?: string;
  address?: string;
  cp?: string;
  phone?: string;
  email?: string;
  iban?: string;
  tenantId?: number;
  payments?: {
    nPayments: number;
    qPayments: number;
  };
  pending?: {
    nPendingPayments: number;
    qPendingPayments: number;
  }
  nContracts?: number;
  nDocs?: number;
}

export interface TenantDoc {
  id?: number;
  tenantId?: number;
  date?: string;
  name?: string;
  path?: string;
  size?: number;
}