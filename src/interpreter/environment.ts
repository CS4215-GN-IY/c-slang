import { BrokenEnvironmentError } from './errors';
import { type EnvironmentFrame } from './types/interpreter';

export class Environment {
  private readonly frames: EnvironmentFrame[] = [];

  public extend(names: string[], values: number[]): void {
    if (names.length !== values.length) {
      throw new BrokenEnvironmentError(
        'Encountered a different number of names and values in a frame.'
      );
    }

    const newFrame: EnvironmentFrame = {};
    for (let i = 0; i < names.length; i++) {
      newFrame[names[i]] = values[i];
    }

    this.frames.push(newFrame);
  }
}
