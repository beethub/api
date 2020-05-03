export interface IReceiptResponse {
  data: IReceipt[];
}

export interface IReceipt {
  id: number;
  business?: any;
  date?: any;
  amount?: any;
  createdAt: string;
  ticket: Ticket;
  invoice?: any;
  status: string;
}

export interface Ticket {
  key: string;
}