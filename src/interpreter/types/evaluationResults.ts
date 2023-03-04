export type Value = any;

export interface Finished {
  status: 'finished';
  value: Value;
}

export interface Error {
  status: 'error';
}

export type Result = Finished | Error;
