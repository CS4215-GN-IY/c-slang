import {BrokenEnvironmentError} from "./errors";
import {EnvironmentFrame} from "./types/interpreter";

export class Environment {
  private frames: EnvironmentFrame[] = [];

  public extend (names: string[], values: number[]) {
    if (names.length !== values.length) {
      new BrokenEnvironmentError('Encountered a different number of names and values in a frame.')
    }

    const newFrame: EnvironmentFrame = {};
    for (let i = 0; i < names.length; i++) {
      newFrame[names[i]] = values[i];
    }

    this.frames.push(newFrame);
  }
}
