import { Stack } from '../stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  test('should be empty upon initialisation', () => {
    expect(stack.size()).toBe(0);
  });

  test('should have a size of 3 after pushing 3 elements onto the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
  });

  test('should pop elements in reverse order', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  test('should peek elements without removing', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    expect(stack.pop()).toBe(1);
  });

  test('should throw an exception when popping from an empty stack', () => {
    expect(stack.size()).toBe(0);
    expect(() => stack.pop()).toThrow('Cannot pop from an empty stack!');
  });

  test('should throw an exception when peeking from an empty stack', () => {
    expect(stack.size()).toBe(0);
    expect(() => stack.peek()).toThrow('Cannot peek from an empty stack!');
  });
});
