import {FilterField} from './common';

export class Loaner {
 id?: number;
 user?: number | null;
 name: string;
 email?: string | null;
 phone: string;
 address?: string | null;
}

export class Payment {
  id?: number | null;
  loaner: number | {
    id: number;
    name: string;
  };
  paymentDate: string;
  paymentAmount: number;
  paymentType: string;
  isPinned?: boolean;
}

export class PaymentSearchParams {
  loanerId: FilterField;
  loanerName: FilterField;
  paymentType: FilterField;
  paymentAmount: FilterField;
  paymentDate: FilterField;
}
