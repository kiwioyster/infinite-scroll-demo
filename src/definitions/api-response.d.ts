import { IPkmn } from './pokemon';

export interface IPkmnListResponse {
  count: number;
  next: string;
  previous?: string;
  results: IPkmn[];
}
