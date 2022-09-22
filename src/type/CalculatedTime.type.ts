export interface CalculatedTime {
  buffer?: string | Date;
  total?: number;
  subBuffer?: Map<string, { time?: number; lastPoint?: string | Date }>;
  subTotal?: Array<any>;
}
