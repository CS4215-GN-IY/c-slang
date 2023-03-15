import { BrokenEnvironmentError, UnboundNameError } from './errors';
import { type Environment, type EnvironmentFrame } from './types/interpreter';

export const extendEnvironment = (
  names: string[],
  values: number[],
  environment: Environment
): Environment => {
  if (names.length !== values.length) {
    throw new BrokenEnvironmentError(
      'Encountered a different number of names and values in a frame.'
    );
  }

  const newFrame: EnvironmentFrame = {};

  for (let i = 0; i < names.length; i++) {
    newFrame[names[i]] = values[i];
  }

  return {
    head: newFrame,
    tail: environment
  };
};

export const getEnvironmentValue = (
  name: string,
  environment: Environment
): number => {
  let currentEnvironment: Environment | null = environment;

  while (currentEnvironment !== null) {
    const frame = environment.head;
    if (name in frame) {
      return frame[name];
    }
    currentEnvironment = currentEnvironment.tail;
  }

  throw new UnboundNameError(`Encountered an unbound name: ${name}`);
};

export const constructGlobalEnvironment = (): Environment => {
  return {
    head: {},
    tail: null
  };
};
