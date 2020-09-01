export interface Income {
  id: number;
  propertyId: number;
  tenantId?: number;
  date: string;
  description: string;
  quantity: number;
  ivaType: number;
  irpfType: number;
  ivaQuantity: number;
  irpfQuantity: number;
  sended: boolean;
  payed: boolean;
  paidExpires: string;
}

export interface Outgoing {
  id: number;
  propertyId: number;
  date: string;
  description: string;
  quantity: number;
  ivaType: number;
  irpfType: number;
  ivaQuantity: number;
  irpfQuantity: number;
}

export interface OutgoingDoc {
  id: number;
  outgoingId: number;
  date: string;
  name: string;
  path: string;
  size: number;
}

export interface IncomeDoc {
  id: number;
  incomeId: number;
  date: string;
  name: string;
  path: string;
  size: number;
}