/**
 * A Last-In-First-Out (LIFO) collection of elements.
 */
export class Stack<T> {
  private readonly elements: T[];

  public constructor() {
    this.elements = [];
  }

  public size(): number {
    return this.elements.length;
  }

  public push(element: T): void {
    this.elements.push(element);
  }

  public pop(): T {
    const poppedElement = this.elements.pop();
    if (poppedElement === undefined) {
      throw new Error('Cannot pop from an empty stack!');
    }
    return poppedElement;
  }

  public peek(): T {
    if (this.size() === 0) {
      throw new Error('Cannot peek from an empty stack!');
    }
    return this.elements[this.size() - 1];
  }
}
