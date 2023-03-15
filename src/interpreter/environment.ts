import { BrokenEnvironmentError, UnboundNameError } from './errors';
import { type EnvironmentFrame } from './types/interpreter';

/**
 * Represents C's compile time symbol table.
 */
export class Environment {
  private readonly frames: EnvironmentFrame[];

  constructor(frames: EnvironmentFrame[] = []) {
    this.frames = frames;
  }

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

  public get(name: string): number {
    for (let i = this.frames.length - 1; i >= 0; i--) {
      if (name in this.frames[i]) {
        return this.frames[i][name];
      }
    }

    throw new UnboundNameError(`Encountered an unbound name: ${name}`);
  }

  public copyOfCurrent(): Environment {
    return new Environment([...this.frames]);
  }
}
