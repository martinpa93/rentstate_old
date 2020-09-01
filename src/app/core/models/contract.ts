export interface Contract {
  id: number;
  tenantId: number;
  start: string;
  end: string;
  propertyIds: number[];
}

export interface ContractDoc {
  id: number;
  contractId: number;
  date: string;
  name: string;
  path: string;
  size: number;
}