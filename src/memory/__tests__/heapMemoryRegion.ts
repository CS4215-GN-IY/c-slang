import { HeapMemoryRegion } from '../heapMemoryRegion';

describe('heap', () => {
  test('returns addresses when there is enough space', () => {
    const heap = new HeapMemoryRegion(10);
    expect(heap.allocate(5)).toBe(0);
    expect(heap.allocate(5)).toBe(5);
  });

  test('returns -1 when there is not enough space', () => {
    const heap = new HeapMemoryRegion(10);
    expect(heap.allocate(5)).toBe(0);
    expect(heap.allocate(6)).toBe(-1);
  });

  test('frees space when passed a valid address', () => {
    const heap = new HeapMemoryRegion(10);
    expect(heap.allocate(5)).toBe(0);
    expect(heap.allocate(5)).toBe(5);
    heap.free(0);
    expect(heap.allocate(5)).toBe(0);
  });

  test('does not free space when passed a valid address', () => {
    const heap = new HeapMemoryRegion(10);
    expect(heap.allocate(5)).toBe(0);
    expect(heap.allocate(5)).toBe(5);
    heap.free(1);
    expect(heap.allocate(5)).toBe(-1);
  });

  test('returns -1 if the available free space is fragmented', () => {
    const heap = new HeapMemoryRegion(10);
    expect(heap.allocate(5)).toBe(0);
    expect(heap.allocate(3)).toBe(5);
    heap.free(0);
    expect(heap.allocate(3)).toBe(0);
    // There are now two free spaces of 2 bytes each. Even though 4 bytes
    // are free in total, our new 3 byte block should fail to allocate.
    expect(heap.allocate(3)).toBe(-1);
  });
});
