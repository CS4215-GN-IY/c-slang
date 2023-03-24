import { type Value } from './types/evaluationResults';
import { type TypeofResult } from './types/utils';

export const typeOf = (v: Value): TypeofResult => typeof v;
const isNumber = (v: Value): v is number => typeOf(v) === 'number';
export const isAddress = (address: Value): address is number =>
  isNumber(address);
