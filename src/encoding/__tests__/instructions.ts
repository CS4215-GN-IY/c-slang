import { type Instr } from '../../interpreter/types/instructions';
import { decodeInstruction, encodeInstruction } from '../instructions';

describe('encoding & decoding of instructions', () => {
  test('successfully decodes encoded instructions', () => {
    const instruction: Instr = {
      type: 'BinaryOperation',
      operator: '+'
    };
    expect(decodeInstruction(encodeInstruction(instruction))).toEqual(
      instruction
    );
  });
});
