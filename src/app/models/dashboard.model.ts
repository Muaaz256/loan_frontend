export class PinnedPayment {
  id: number;
  type: string;
  paymentAmount: number;
  paymentDate: string;
  paymentLoaner: string;
}

export class Dashboard {
  totalPayable: number;
  totalPaid: number;
  paymentsDifference: number;
  pinnedPayments: PinnedPayment [];
}
