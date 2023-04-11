import {type Instr} from "../interpreter/types/instructions";

const ENCODED_CHAR_SIZE = 5;

export const encodeInstruction = (instruction: Instr): bigint => {
  const stringifiedInstruction = JSON.stringify(instruction);
  const chars = stringifiedInstruction.split('');
  const charCodes = chars.map((char) => char.charCodeAt(0));
  const paddedCharCodes = charCodes.map((charCode) => charCode.toString().padStart(ENCODED_CHAR_SIZE, '0'));
  // Add a '1' in front so that leading zeroes are not stripped.
  const encodedInstruction = '1' + paddedCharCodes.join('');
  return BigInt(encodedInstruction);
}

export const decodeInstruction = (encodedInstruction: bigint): Instr => {
  // Remove the '1' at the front that prevents leading zeroes from being stripped.
  const encodedInstructionSubstring = encodedInstruction.toString().substring(1);
  const paddedCharCodes: string[] = [];
  for (let i = 0; i < encodedInstructionSubstring.length; i += ENCODED_CHAR_SIZE) {
    paddedCharCodes.push(encodedInstructionSubstring.substring(i, i + ENCODED_CHAR_SIZE));
  }
  const charCodes = paddedCharCodes.map((paddedCharCode) => parseInt(paddedCharCode));
  const chars = charCodes.map((charCode) => String.fromCharCode(charCode));
  const stringifiedInstruction = chars.join('');
  return JSON.parse(stringifiedInstruction);
}
