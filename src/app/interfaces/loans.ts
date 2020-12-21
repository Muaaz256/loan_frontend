export interface PaymentInterface {
  id?: number | null;
  loaner: number | {
    id: number;
    name: string;
  };
  payment_date: string;
  payment_amount: number;
  payment_type: string;
  is_pinned?: boolean;
}
