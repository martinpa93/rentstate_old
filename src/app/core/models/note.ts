import { Contract } from './contract';
import { Property } from './property';
import { Tenant } from './tenant';

export interface Note {
  id?: number;
  typeRel?: string;
  relId?: number;
  rel?: Property | Tenant | Contract
  propertyId?: number;
  contractId?: number;
  tenantId?: number;
  date?: string;
  title?: string;
  description?: string;
}