export interface CalculatedTime {
  buffer?: string | Date;
  total?: number;
  subBuffer?: string | Date;
  subTotal?: Array<{ time: number; title: string }>;
}
