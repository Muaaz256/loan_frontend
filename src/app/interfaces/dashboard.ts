export interface PinnedPaymentInterface {
  id: number;
  payment_type: string;
  payment_amount: number;
  payment_date: string;
  payment_loaner: string;
}

export interface DashboardInterface {
  received: number;
  paid: number;
  payments_difference: number;
  pinned_payments: PinnedPaymentInterface [];
}
